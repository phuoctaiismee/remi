import type Database from "@tauri-apps/plugin-sql";
import { invoke } from "@tauri-apps/api/core";

let dbInstance: Database | null = null;
let isInitialized = false;

export const getDB = async () => {
  if (typeof window === "undefined") {
    throw new Error("Cannot use Tauri database on the server");
  }

  if (!dbInstance) {
    // Dynamically import to avoid SSR issues with 'window is not defined'
    const { default: SQLDatabase } = await import("@tauri-apps/plugin-sql");
    dbInstance = await SQLDatabase.load("sqlite:tasks.db");
  }
  
  if (!isInitialized) {
    await dbInstance.execute(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        remind_at DATETIME NOT NULL,
        is_completed BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    isInitialized = true;
  }
  
  return dbInstance;
};

export const initDB = async () => {
  await getDB();
};

export const addTask = async (title: string, remindAt: string) => {
  const db = await getDB();
  const result = await db.execute(
    "INSERT INTO tasks (title, remind_at) VALUES ($1, $2)",
    [title, remindAt]
  );
  try {
     await invoke("notify_task_created");
  } catch (err) {
     console.error("Failed to notify rust worker:", err);
  }
  return result;
};

export const getPendingTasks = async () => {
  try {
    const db = await getDB();
    return await db.select<{ id: number; title: string; remind_at: string; is_completed: number; created_at: string }[]>(
      "SELECT * FROM tasks WHERE is_completed = 0 ORDER BY remind_at ASC"
    );
  } catch (error) {
    if (typeof window === "undefined") return []; // Ignore SSR
    throw error;
  }
};

export const markTaskCompleted = async (id: number) => {
  const db = await getDB();
  return await db.execute(
    "UPDATE tasks SET is_completed = 1 WHERE id = $1",
    [id]
  );
};

export const createSampleTask = async (delaySeconds: number) => {
  const remindAt = new Date(Date.now() + delaySeconds * 1000).toISOString();
  return await addTask(`Sample Task (in ${delaySeconds}s)`, remindAt);
};