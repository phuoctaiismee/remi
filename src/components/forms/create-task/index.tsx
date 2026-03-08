"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, Check } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@/components/ui/date-picker";
import { SpinnerTimePicker } from "@/components/ui/spinner-time-picker";
import { CategorySelector } from "@/features/screens/create-task/components/category-selector";
import { VoiceOverlay } from "@/features/screens/create-task/components/voice-overlay";

export const taskSchema = z.object({
    title: z.string().min(1, "Task title is required"),
    date: z.date(),
    time: z.string(),
    category: z.string(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

interface CreateTaskFormProps {
    initialValues?: Partial<TaskFormValues>;
    onSubmit: (data: TaskFormValues) => void;
}

export function CreateTaskForm({ initialValues, onSubmit }: CreateTaskFormProps) {
    const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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
            category: initialValues?.category || "Personal",
        },
    });

    const titleValue = form.watch("title");

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [titleValue]);

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

    const onError = () => {
        const input = document.getElementById('task-title-input');
        if (input) {
            input.classList.add('border-red-500', 'border-b-2');
            setTimeout(() => input.classList.remove('border-red-500', 'border-b-2'), 2000);
        }
    };

    const setTime = React.useCallback((t: string) => {
        form.setValue("time", t);
    }, [form]);

    return (
        <>
            <form onSubmit={form.handleSubmit(handleSubmit, onError)} className="bg-white rounded-[32px] p-6 mb-24 flex-1 flex flex-col relative shadow-sm overflow-y-auto hide-scrollbar">

                {/* Title Input */}
                <div className="mb-8 mt-4">
                    <textarea
                        id="task-title-input"
                        {...(() => {
                            const { ref: registerRef, ...rest } = form.register("title");
                            return {
                                ...rest,
                                ref: (e: HTMLTextAreaElement | null) => {
                                    registerRef(e);
                                    // @ts-ignore
                                    textareaRef.current = e;
                                }
                            };
                        })()}
                        placeholder="What do you need to do?"
                        className="w-full text-3xl font-semibold text-neutral-900 placeholder:text-neutral-300 outline-none resize-none bg-transparent overflow-hidden leading-tight transition-colors"
                        rows={1}
                        autoFocus
                    />
                </div>

                {/* Quick Actions (Date, Time, Category) */}
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

                    <CategorySelector
                        category={form.watch("category")}
                        setCategory={(c) => form.setValue("category", c)}
                    />
                </div>

                {/* Hidden submit button to allow form submission via Enter if needed */}
                <button type="submit" className="hidden" id="hidden-submit-btn" />
            </form>

            {/* Bottom Action Bar */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-3">
                <button
                    type="button"
                    onPointerDown={handlePointerDown}
                    className="w-14 h-14 shrink-0 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-xl active:scale-95 transition-all touch-none cursor-pointer"
                >
                    <Mic className="w-6 h-6" />
                </button>
                <button
                    type="button"
                    onClick={() => {
                        const btn = document.getElementById('hidden-submit-btn');
                        if (btn) btn.click();
                    }}
                    className="flex-1 h-14 rounded-full bg-[#D1E8C4] text-neutral-900 font-semibold text-lg shadow-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                >
                    <Check className="w-5 h-5" /> Create Task
                </button>
            </div>

            <VoiceOverlay isOpen={isVoiceModalOpen} />
        </>
    );
}
