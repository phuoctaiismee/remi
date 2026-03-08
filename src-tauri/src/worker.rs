use chrono::{DateTime, Utc};
use sqlx::{sqlite::SqliteConnectOptions, SqlitePool, Row};
use std::{str::FromStr, sync::Arc, time::Duration};
use tauri::{AppHandle, Manager};
use tauri_plugin_notification::NotificationExt;
use tokio::sync::mpsc;
use tokio::time::sleep;

pub struct WorkerState {
    pub tx: mpsc::Sender<()>,
}

pub fn start_background_worker(app_handle: AppHandle) {
    // Create a channel to signal when a new task is created
    let (tx, mut rx) = mpsc::channel::<()>(10);

    // Save sender into app state so we can trigger it from frontend
    app_handle.manage(WorkerState { tx });

    // Ensure we have AppData path since Tauri SQLite stores it in the app's config dir
    let app_dir = match app_handle.path().app_data_dir() {
        Ok(dir) => dir,
        Err(_) => {
            println!("Failed to get app_data_dir");
            return;
        }
    };
    
    // SQLite DB file path used by tauri-plugin-sql
    let db_path = app_dir.join("tasks.db");
    
    tokio::spawn(async move {
        // Wait a small bit to ensure plugin-sql creates the db first
        sleep(Duration::from_secs(2)).await;
        
        // Connect via sqlx directly
        let db_url = format!("sqlite://{}", db_path.to_string_lossy());
        
        let pool = match SqlitePool::connect(&db_url).await {
            Ok(p) => p,
            Err(e) => {
                println!("Failed to connect to SQLite directly: {}", e);
                return;
            }
        };

        loop {
            // Find the single closest pending task
            let query_result = sqlx::query(
                "SELECT id, title, remind_at FROM tasks WHERE is_completed = 0 ORDER BY remind_at ASC LIMIT 1"
            )
            .fetch_optional(&pool)
            .await;

            let mut sleep_duration = Duration::from_secs(60 * 60); // Default sleep 1 hour if no task

            match query_result {
                Ok(Some(row)) => {
                    let id: i64 = row.get("id");
                    let title: String = row.get("title");
                    let remind_at_str: String = row.get("remind_at");

                    // Parse the ISO date string stored in SQLite
                    if let Ok(remind_at) = DateTime::parse_from_rfc3339(&remind_at_str) {
                         let remind_at_utc = remind_at.with_timezone(&Utc);
                         let now = Utc::now();

                         if remind_at_utc <= now {
                             // Task is already DƯỜNG or PAST DUE
                             sleep_duration = Duration::from_secs(0); // Trigger immediately

                             // Show notification
                             if let Err(e) = app_handle.notification()
                                .builder()
                                .title("Remi - Dành cho bạn!")
                                .body(&title)
                                .show() {
                                    println!("Show notification failed! {:?}", e);
                                }

                             // Update the DB
                             let _ = sqlx::query("UPDATE tasks SET is_completed = 1 WHERE id = ?")
                                .bind(id)
                                .execute(&pool)
                                .await;

                         } else {
                             // Task is in the future. Calculate exact wait time
                             if let Ok(duration) = (remind_at_utc - now).to_std() {
                                 sleep_duration = duration;
                             }
                         }
                    }
                },
                Ok(None) => {
                    // No pending tasks. Sleep for max time or until interrupted
                },
                Err(e) => {
                    println!("Error querying task: {}", e);
                    sleep(Duration::from_secs(10)).await; // Retry later
                }
            }

            // Sleep until either the duration hits OR we get a signal that a new task was added
            tokio::select! {
                _ = sleep(sleep_duration) => {
                    // Woke up naturally (time passed)
                }
                _ = rx.recv() => {
                    // Interrupted because a new task was added! Loop will restart immediately
                    // and re-evaluate the closest task in the DB.
                    println!("Worker interrupted to recalculate next task!");
                }
            }
        }
    });

}
