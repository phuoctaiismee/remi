use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, type TEXT, reminder_time TEXT, status TEXT DEFAULT 'pending');",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "add_hashtags_and_relations",
            sql: "
            CREATE TABLE IF NOT EXISTS hashtags (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                color TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS task_hashtags (
                task_id INTEGER NOT NULL,
                hashtag_id INTEGER NOT NULL,
                PRIMARY KEY (task_id, hashtag_id),
                FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
                FOREIGN KEY (hashtag_id) REFERENCES hashtags(id) ON DELETE CASCADE
            );",
            kind: MigrationKind::Up,
        }
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().add_migrations("sqlite:remider.db", migrations).build())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
