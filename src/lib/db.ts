import Database from '@tauri-apps/plugin-sql';

let dbInstance: Database | null = null;

declare global {
  interface Window {
    __TAURI_INTERNALS__?: unknown;
  }
}

export const initDB = async () => {
  if (!dbInstance) {
    if (typeof window !== 'undefined' && window.__TAURI_INTERNALS__) {
       dbInstance = await Database.load('sqlite:remider.db');
    } else {
       console.warn("Tauri SQLite plugin is not available in this environment. Returning mock or null.");
       // Optional: Return a mock object or throw a controlled error that the UI handles gracefully.
       // For now, we'll throw to let the UI catch it instead of a fatal top-level error.
       throw new Error("Tauri API not available");
    }
  }
  return dbInstance;
};

export interface Hashtag {
  id?: number;
  name: string;
  color: string;
}

export interface Task {
  id?: number;
  content: string;
  hashtags: Hashtag[];
  reminder_time: string;
  status?: string;
}

export const createTask = async (task: Task) => {
  const db = await initDB();
  
  // 1. Insert Task
  const result = await db.execute(
    'INSERT INTO tasks (content, reminder_time, status) VALUES ($1, $2, $3)',
    [task.content, task.reminder_time, task.status || 'pending']
  );
  
  const taskId = result.lastInsertId;

  // 2. Process Hashtags
  if (task.hashtags && task.hashtags.length > 0) {
    for (const tag of task.hashtags) {
        // Insert hashtag if it doesn't exist, ignore if it does
        await db.execute(
            'INSERT OR IGNORE INTO hashtags (name, color) VALUES ($1, $2)',
            [tag.name, tag.color]
        );
        
        // Get the ID of the hashtag (whether newly inserted or existing)
        const rows = await db.select<{id: number}[]>('SELECT id FROM hashtags WHERE name = $1', [tag.name]);
        if (rows.length > 0) {
            const hashtagId = rows[0].id;
            
            // Map task to hashtag
            await db.execute(
                'INSERT INTO task_hashtags (task_id, hashtag_id) VALUES ($1, $2)',
                [taskId, hashtagId]
            );
        }
    }
  }

  return result;
};

export const getTasks = async (): Promise<Task[]> => {
  const db = await initDB();
  
  // Fetch tasks
  const tasks = await db.select<Task[]>('SELECT id, content, reminder_time, status FROM tasks');
  
  // Fetch hashtags mapping
  const mappings = await db.select<{task_id: number, id: number, name: string, color: string}[]>(`
      SELECT th.task_id, h.id, h.name, h.color 
      FROM task_hashtags th 
      JOIN hashtags h ON th.hashtag_id = h.id
  `);

  // Map hashtags back to their tasks
  return tasks.map(t => {
      const taskTags = mappings
          .filter(m => m.task_id === t.id)
          .map(m => ({ id: m.id, name: m.name, color: m.color }));
      return {
          ...t,
          hashtags: taskTags
      };
  });
};

export const getHashtags = async (): Promise<Hashtag[]> => {
  const db = await initDB();
  return await db.select<Hashtag[]>('SELECT * FROM hashtags');
};
