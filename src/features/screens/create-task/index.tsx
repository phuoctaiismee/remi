"use client";

import { CreateTaskForm, TaskFormValues } from "@/components/forms";
import { AppTopbar, useRouter } from "@/lib/navigation";
import { createTask } from "@/lib/db";

export default function () {
    const router = useRouter();


    const goSchedule = () => {
        router.push("/schedule");
    };

    const handleSubmit = async (data: TaskFormValues) => {
        console.log("Task Created:", data);
        try {
            // Combine date and time
            const d = data.date;
            const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            const reminderTime = `${dateStr}T${data.time}:00`;

            await createTask({
                content: data.title,
                hashtags: data.hashtags,
                reminder_time: reminderTime
            });
            console.log("Task successfully saved to db");
        } catch (error) {
            console.error("Failed to create task", error);
        }
        goSchedule();
    };

    return (
        <div className="hide-scrollbar flex flex-col h-dvh p-4">
            <AppTopbar center={<h1 className="text-xl font-medium">New Task</h1>} />


            <CreateTaskForm onSubmit={handleSubmit} />
        </div>
    );
}
