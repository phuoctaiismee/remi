"use client";

import { ArrowLeft } from "lucide-react";
import { CreateTaskForm, TaskFormValues } from "@/components/forms";
import { useRouter } from "next/navigation";

export default function () {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    const handleSubmit = (data: TaskFormValues) => {
        console.log("Task Created:", data);
        // Here you would typically save the task to your state/database
        goBack();
    };

    return (
        <div className="flex-1 overflow-y-auto pb-32 px-4 pt-12 hide-scrollbar flex flex-col h-full">
            <div className="flex items-center justify-between mb-8 text-white px-2">
                <button onClick={goBack} className="w-11 h-11 rounded-full bg-neutral-800/50 flex items-center justify-center border border-neutral-700/50 transition-colors hover:bg-neutral-700/50">
                    <ArrowLeft className="w-5 h-5 text-neutral-300" />
                </button>
                <h1 className="text-xl font-medium">New Task</h1>
                <div className="w-11 h-11"></div>
            </div>

            <CreateTaskForm onSubmit={handleSubmit} />
        </div>
    );
}
