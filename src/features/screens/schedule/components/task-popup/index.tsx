"use client";

import { X, Clock, Calendar as CalendarIcon, Tag } from "lucide-react";
import { formatDistanceToNow, isPast } from "date-fns";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

interface Task {
    id: string;
    title: string;
    time: string;
    description?: string;
    hashtags?: string[];
    date: Date;
}

interface TaskPopupProps {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
}

const TaskPopup = ({ task, isOpen, onClose }: TaskPopupProps) => {
    if (!task) return null;

    // Calculate time until reminder
    const taskDateTime = new Date(task.date);
    let timeUntil = "Unknown time";

    if (task.time) {
        const [hours, minutes] = task.time.split(':');
        const isPM = task.time.toLowerCase().includes('pm');
        let h = parseInt(hours, 10);
        if (isPM && h !== 12) h += 12;
        if (!isPM && h === 12) h = 0;

        taskDateTime.setHours(h, parseInt(minutes, 10), 0, 0);

        timeUntil = isPast(taskDateTime)
            ? `Passed ${formatDistanceToNow(taskDateTime)} ago`
            : `In ${formatDistanceToNow(taskDateTime)}`;
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-200 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        className="fixed bottom-0 left-0 right-0 z-200 bg-neutral-900 rounded-t-[32px] p-6 pb-12 shadow-2xl border-t border-neutral-800"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex-1 pr-4">
                                <h2 className="text-2xl font-semibold text-white mb-2">{task.title}</h2>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D1E8C4]/10 text-[#D1E8C4] text-sm font-medium">
                                    <Clock className="w-4 h-4" />
                                    {timeUntil}
                                </div>
                            </div>
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors shrink-0"
                            >
                                <X className="size-5" />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-neutral-300 bg-neutral-800/50 p-4 rounded-2xl">
                                <Clock className="w-5 h-5 text-neutral-400" />
                                <div>
                                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-0.5">Time</p>
                                    <p className="font-medium text-white">{task.time}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-neutral-300 bg-neutral-800/50 p-4 rounded-2xl">
                                <CalendarIcon className="w-5 h-5 text-neutral-400" />
                                <div>
                                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-0.5">Date</p>
                                    <p className="font-medium text-white">{task.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>

                            {task.hashtags && task.hashtags.length > 0 && (
                                <div className="flex items-start gap-3 text-neutral-300 bg-neutral-800/50 p-4 rounded-2xl">
                                    <Tag className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1.5">Hashtags</p>
                                        <div className="flex flex-wrap gap-2">
                                            {task.hashtags.map(tag => (
                                                <span key={tag} className="px-2.5 py-1 rounded-full bg-neutral-700 text-white text-xs font-medium">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {task.description && (
                                <div className="mt-6">
                                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-2">Description</p>
                                    <p className="text-neutral-300 leading-relaxed">{task.description}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default TaskPopup;