"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
    date: Date;
    setDate: (d: Date) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
    const formatDisplayDate = (d: Date) => {
        if (!d) return "Set Date";
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (d.toDateString() === today.toDateString()) return "Today";
        if (d.toDateString() === tomorrow.toDateString()) return "Tomorrow";

        return format(d, "MMM d");
    };

    return (
        <Popover>
            <PopoverTrigger className="flex-1 flex items-center justify-center gap-2 bg-neutral-50 border border-neutral-100 py-3.5 rounded-2xl active:scale-95 transition-transform">
                <CalendarIcon className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-sm text-neutral-700">{formatDisplayDate(date)}</span>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-2xl border-none shadow-xl" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => d && setDate(d)}
                    initialFocus
                    className="p-3"
                />
            </PopoverContent>
        </Popover>
    );
}
