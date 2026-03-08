"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SpinnerTimePickerProps {
    time: string;
    setTime: (t: string) => void;
}

export function SpinnerTimePicker({ time, setTime }: SpinnerTimePickerProps) {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours, 10);
    const m = parseInt(minutes, 10);

    const [selectedHour, setSelectedHour] = useState(h % 12 === 0 ? 12 : h % 12);
    const [selectedMinute, setSelectedMinute] = useState(m);
    const [isPM, setIsPM] = useState(h >= 12);

    const hoursList = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutesList = Array.from({ length: 60 }, (_, i) => i);

    useEffect(() => {
        let newH = selectedHour;
        if (isPM && newH !== 12) newH += 12;
        if (!isPM && newH === 12) newH = 0;

        const formattedH = newH.toString().padStart(2, '0');
        const formattedM = selectedMinute.toString().padStart(2, '0');
        const newTime = `${formattedH}:${formattedM}`;

        if (time !== newTime) {
            setTime(newTime);
        }
    }, [selectedHour, selectedMinute, isPM, time, setTime]);

    const formatDisplayTime = (timeStr: string) => {
        if (!timeStr) return "Set Time";
        const [hStr, mStr] = timeStr.split(':');
        const hNum = parseInt(hStr, 10);
        const ampm = hNum >= 12 ? 'PM' : 'AM';
        const formattedH = hNum % 12 || 12;
        return `${formattedH}:${mStr} ${ampm}`;
    };

    return (
        <Popover>
            <PopoverTrigger className="flex-1 flex items-center justify-center gap-2 bg-neutral-50 border border-neutral-100 py-3.5 rounded-2xl active:scale-95 transition-transform">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="font-medium text-sm text-neutral-700">{formatDisplayTime(time)}</span>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 rounded-2xl border-none shadow-xl" align="end">
                <div className="flex justify-center gap-4 p-4 bg-white rounded-xl select-none">
                    {/* Hours */}
                    <div className="h-40 w-16 overflow-y-auto snap-y snap-mandatory hide-scrollbar border-y border-neutral-100 relative"
                        onScroll={(e) => {
                            const el = e.currentTarget;
                            const itemHeight = 40;
                            const index = Math.round(el.scrollTop / itemHeight);
                            if (hoursList[index]) setSelectedHour(hoursList[index]);
                        }}>
                        <div className="h-16" />
                        {hoursList.map(hour => (
                            <div key={hour} className={`h-10 flex items-center justify-center snap-center text-lg transition-colors ${selectedHour === hour ? 'font-bold text-neutral-900' : 'text-neutral-400'}`}>
                                {hour.toString().padStart(2, '0')}
                            </div>
                        ))}
                        <div className="h-16" />
                    </div>

                    <div className="flex items-center justify-center font-bold text-xl pb-1">:</div>

                    {/* Minutes */}
                    <div className="h-40 w-16 overflow-y-auto snap-y snap-mandatory hide-scrollbar border-y border-neutral-100 relative"
                        onScroll={(e) => {
                            const el = e.currentTarget;
                            const itemHeight = 40;
                            const index = Math.round(el.scrollTop / itemHeight);
                            if (minutesList[index] !== undefined) setSelectedMinute(minutesList[index]);
                        }}>
                        <div className="h-16" />
                        {minutesList.map(minute => (
                            <div key={minute} className={`h-10 flex items-center justify-center snap-center text-lg transition-colors ${selectedMinute === minute ? 'font-bold text-neutral-900' : 'text-neutral-400'}`}>
                                {minute.toString().padStart(2, '0')}
                            </div>
                        ))}
                        <div className="h-16" />
                    </div>

                    {/* AM/PM */}
                    <div className="flex flex-col justify-center gap-2 ml-2">
                        <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setIsPM(false); }}
                            className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors ${!isPM ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-400 hover:bg-neutral-50'}`}
                        >
                            AM
                        </button>
                        <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setIsPM(true); }}
                            className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors ${isPM ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-400 hover:bg-neutral-50'}`}
                        >
                            PM
                        </button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
