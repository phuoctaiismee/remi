// "use client";

// import { useEffect, useRef } from "react";
// import { getPendingTasks, markTaskCompleted } from "@/lib/db";

// export function NotificationsProvider() {
//   const isPollingRef = useRef(false);

//   useEffect(() => {
//     // Skip on server
//     if (typeof window === "undefined") return;

//     const checkPermissions = async () => {
//       const notification = await import("@tauri-apps/plugin-notification");
//       let permissionGranted = await notification.isPermissionGranted();
//       if (!permissionGranted) {
//         const permission = await notification.requestPermission();
//         permissionGranted = permission === "granted";
//       }
//       return permissionGranted;
//     };

//     const pollTasks = async () => {
//       if (isPollingRef.current) return;
//       isPollingRef.current = true;

//       try {
//         const hasPermission = await checkPermissions();
//         if (!hasPermission) return;

//         const tasks = await getPendingTasks();
//         const now = new Date();

//         for (const task of tasks) {
//           const remindTime = new Date(task.remind_at);
//           if (now >= remindTime) {
//             // Trigger notification
//             const notification = await import("@tauri-apps/plugin-notification");
//             notification.sendNotification({ title: "Remi - It's Time!", body: task.title });
//             // Mark as completed in DB
//             await markTaskCompleted(task.id);
//           }
//         }
//       } catch (error) {
//         console.error("Error polling tasks:", error);
//       } finally {
//         isPollingRef.current = false;
//       }
//     };

//     // Poll every 1 second
//     const interval = setInterval(pollTasks, 1000);
    
//     // Initial check
//     pollTasks();

//     return () => clearInterval(interval);
//   }, []);

//   return null;
// }

