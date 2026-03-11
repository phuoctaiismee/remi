import { CardActionArea } from "@/components/ui/card-action-area";
import { Task } from "@/lib/db";
import { formatDate, isPast, parse } from "date-fns";
import { cn } from "@/lib/utils";

interface TimelineProps {
    tasks: Task[];
    onTaskClick: (task: Task) => void;
}

const Timeline = ({ tasks, onTaskClick }: TimelineProps) => {
    if (tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-neutral-500">
                <p>No tasks scheduled for this day.</p>
            </div>
        );
    }

    // Sort tasks by time
    const sortedTasks = [...tasks].sort((a, b) => {
        const timeA = parse(a.reminder_time, 'hh:mm a', new Date());
        const timeB = parse(b.reminder_time, 'hh:mm a', new Date());
        return timeA.getTime() - timeB.getTime();
    });

    return (
        <div className="relative pl-8 pr-2 space-y-6 before:absolute before:inset-0 before:ml-10 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-800 before:to-transparent">

            {sortedTasks.map((task, index) => {
                // Determine if task is past or active
                const taskDateTime = new Date(task.reminder_time);
                const [hours, minutes] = task.reminder_time.split(':');
                const isPM = task.reminder_time.toLowerCase().includes('pm');
                let h = parseInt(hours, 10);
                if (isPM && h !== 12) h += 12;
                if (!isPM && h === 12) h = 0;
                taskDateTime.setHours(h, parseInt(minutes, 10), 0, 0);

                const isTaskPast = isPast(taskDateTime);
                const isActive = !isTaskPast && index === sortedTasks.findIndex(t => {
                    const tDate = new Date(t.reminder_time);
                    const [tH, tM] = t.reminder_time.split(':');
                    const tIsPM = t.reminder_time.toLowerCase().includes('pm');
                    let th = parseInt(tH, 10);
                    if (tIsPM && th !== 12) th += 12;
                    if (!tIsPM && th === 12) th = 0;
                    tDate.setHours(th, parseInt(tM, 10), 0, 0);
                    return !isPast(tDate);
                });

                return (
                    <CardActionArea
                        key={task.id}
                        onClick={() => onTaskClick(task)}
                        className={cn(
                            "relative overflow-visible flex items-center justify-between group cursor-pointer hover:scale-[1.02] hover:bg-background/60 w-full transition-all duration-300",
                            isActive && "is-active",
                            isTaskPast && "opacity-60"
                        )}
                    >
                        <div className={cn(
                            "shrink-0 flex items-center justify-center w-6 h-6 rounded-full border-4 border-[#121212] absolute left-[-24px] top-1/2 -translate-y-1/2 z-10 transition-colors duration-300",
                            isActive ? 'bg-[#D1E8C4]' : isTaskPast ? 'bg-neutral-700' : 'bg-neutral-600'
                        )} />

                        <div className={cn(
                            "bg-neutral-800 rounded-[24px] p-4 w-full ml-4 shadow-sm transition-all duration-300 border-2 border-transparent",
                            isActive && "bg-neutral-800/80 border-[#D1E8C4]"
                        )}>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className={cn(
                                    "font-semibold text-white transition-colors duration-300",
                                    isActive && "text-[#D1E8C4]",
                                    isTaskPast && "text-neutral-400 line-through"
                                )}>
                                    {task.content}
                                </h3>
                                <span className={cn(
                                    "text-xs font-medium text-neutral-400 transition-colors duration-300",
                                    isActive && "text-[#D1E8C4]/80",
                                    isTaskPast && "text-neutral-500"
                                )}>
                                    {formatDate(task.reminder_time, "PPP")}
                                </span>
                            </div>

                            {task.hashtags && task.hashtags.length > 0 && (
                                <div className="flex gap-1.5 flex-wrap mt-2">
                                    {task.hashtags.map(tag => (
                                        <div
                                            key={tag.name}
                                            className="flex items-center gap-1.5 px-2 py-1 rounded-md backdrop-blur-sm text-[11px] font-medium text-white shadow-sm"
                                            style={{ backgroundColor: `${tag.color}20` }}
                                        >
                                            <div
                                                className="size-1.5 rounded-full"
                                                style={{ backgroundColor: tag.color }}
                                            />
                                            {tag.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardActionArea>
                );
            })}
        </div>
    );
}

export default Timeline;