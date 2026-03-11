import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, format, startOfWeek, subDays } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardActionArea } from "@/components/ui/card-action-area";
import { cn } from "@/lib/utils";

interface CalendarStripProps {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
}

const CalendarStrip = ({ selectedDate, onSelectDate }: CalendarStripProps) => {
    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(selectedDate, { weekStartsOn: 1 }));

    const handlePrevWeek = () => {
        setCurrentWeekStart(prev => subDays(prev, 7));
    };

    const handleNextWeek = () => {
        setCurrentWeekStart(prev => addDays(prev, 7));
    };

    const days = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

    return (
        <div className="mb-8 px-2">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-medium text-lg">
                    {format(currentWeekStart, "MMMM yyyy")}
                </h2>
                <div className="flex gap-2">
                    <Button
                        variant={"outline"}
                        size={"icon"}
                        onClick={handlePrevWeek}
                        className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                        variant={"outline"}
                        size={"icon"}
                        onClick={handleNextWeek}
                        className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="flex justify-between items-center">
                {days.map((day) => {
                    const isActive = format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                    const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

                    return (
                        <CardActionArea
                            key={day.toISOString()}
                            onClick={() => onSelectDate(day)}
                            className={cn(
                                "relative flex flex-col items-center justify-center w-11 h-[76px] rounded-full",
                                isActive ? "bg-[#D1E8C4] text-neutral-900 shadow-sm" : "bg-transparent text-neutral-400 hover:bg-neutral-800/50"
                            )}
                        >
                            <span className={cn(
                                "text-[10px] font-medium uppercase mb-1",
                                isActive ? "text-neutral-700" : "text-neutral-500"
                            )}>
                                {format(day, 'EEE')}
                            </span>
                            <span className={cn(
                                "text-base font-semibold w-8 h-8 flex items-center justify-center rounded-full",
                                isActive ? "bg-white text-neutral-900 shadow-sm" : isToday ? "text-[#D1E8C4]" : "text-neutral-200"
                            )}>
                                {format(day, 'd')}
                            </span>
                            {isToday && (
                                <span className={cn(
                                    "absolute bottom-2 w-1 h-1 rounded-full",
                                    isActive ? "bg-neutral-900" : "bg-[#D1E8C4]"
                                )} />
                            )}
                        </CardActionArea>
                    )
                })}
            </div>
        </div>
    );
}

export default CalendarStrip