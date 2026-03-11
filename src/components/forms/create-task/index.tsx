"use client";

import React, { useState, useEffect } from "react";
import { Mic, Plus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@/components/ui/date-picker";
import { SpinnerTimePicker } from "@/components/ui/spinner-time-picker";
import { HashtagSelector, VoiceOverlay } from "@/features/screens/create-task/components";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CONST_TRANSITION } from "@/const";
import { ViewTransition } from '@/lib/view-transition';

export const taskSchema = z.object({
    title: z.string().min(1, "Task title is required"),
    date: z.date(),
    time: z.string(),
    hashtags: z.array(z.object({
        name: z.string(),
        color: z.string()
    })),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

interface CreateTaskFormProps {
    initialValues?: Partial<TaskFormValues>;
    onSubmit: (data: TaskFormValues) => void;
}

export function CreateTaskForm({ initialValues, onSubmit }: CreateTaskFormProps) {
    const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
    const defaultTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: initialValues?.title || "",
            date: initialValues?.date || new Date(),
            time: initialValues?.time || defaultTime(),
            hashtags: initialValues?.hashtags || []
        },
    });

    const titleValue = form.watch("title");


    useEffect(() => {
        const handleGlobalPointerUp = () => {
            if (isVoiceModalOpen) setIsVoiceModalOpen(false);
        };
        window.addEventListener('pointerup', handleGlobalPointerUp);
        window.addEventListener('pointercancel', handleGlobalPointerUp);
        return () => {
            window.removeEventListener('pointerup', handleGlobalPointerUp);
            window.removeEventListener('pointercancel', handleGlobalPointerUp);
        };
    }, [isVoiceModalOpen]);

    const handlePointerDown = (e: React.PointerEvent) => {
        e.preventDefault();
        setIsVoiceModalOpen(true);
    };

    const handleSubmit = (data: TaskFormValues) => {
        onSubmit(data);
    };

    const setTime = React.useCallback((t: string) => {
        form.setValue("time", t);
    }, [form]);

    return (
        <>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex-1 flex flex-col overflow-hidden pb-2">
                {/* Content Scroll (Title + Quick Actions) */}
                <div className="flex-1 overflow-y-auto hide-scrollbar">
                    <div className="bg-white rounded-[32px] px-6 pt-8 pb-8">
                        {/* Title Input */}
                        <div className="mb-8">
                            <Textarea
                                id="task-title-input"
                                value={form.watch("title")}
                                onChange={(e) => form.setValue("title", e.target.value)}
                                placeholder="What do you need to do?"
                                className="w-full text-3xl font-semibold text-neutral-900 placeholder:text-neutral-300 outline-none resize-none bg-transparent overflow-hidden leading-tight transition-colors ring-0 border-none focus-visible:ring-0 focus-visible:border-none"
                                rows={1}
                                autoFocus
                            />
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-col gap-6">
                            <div className="flex gap-3">
                                <DatePicker
                                    date={form.watch("date")}
                                    setDate={(d) => form.setValue("date", d)}
                                />
                                <SpinnerTimePicker
                                    time={form.watch("time")}
                                    setTime={setTime}
                                />
                            </div>

                            <HashtagSelector
                                hashtags={form.watch("hashtags")}
                                setHashtags={(h) => form.setValue("hashtags", h)}
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar Fixed */}
                <div className="fixed bottom-4 left-4 right-4 z-20 flex gap-3 mt-4">
                    <Button
                        variant="secondary"
                        size="icon"
                        type="button"
                        onPointerDown={handlePointerDown}
                        className="size-14 shrink-0 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-xl active:scale-95 transition-all touch-none cursor-pointer"
                    >
                        <Mic className="size-6" />
                    </Button>
                    <ViewTransition name={CONST_TRANSITION.TASK_CREATE_BUTTON}>

                        <Button
                            type="submit"
                            className="flex-1 h-14 rounded-full bg-[#D1E8C4] text-neutral-900 font-semibold text-lg shadow-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                        >
                            <Plus className="size-5" /> Create Task
                        </Button>
                    </ViewTransition>
                </div>
            </form>




            <VoiceOverlay isOpen={isVoiceModalOpen} />
        </>
    );
}
