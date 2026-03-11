'use client'

import { useState, useMemo } from "react"
import { Plus } from "lucide-react"
import { CalendarStrip, TaskPopup, Timeline } from "./components"
import { getTasks } from "@/lib/db"
import { useRouter } from "@/lib/navigation"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import LargeLoadingUI from "@/components/ui/large-loading"

const SheduleScreen = () => {
    const router = useRouter()
    const [selectedTask, setSelectedTask] = useState<any | null>(null);
    const { data, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks,
    })
    const [selectedDate, setSelectedDate] = useState(new Date());

    const filteredTasks = useMemo(() => {
        return data?.filter(t => {
            const d = new Date(t.reminder_time);
            return d.getFullYear() === selectedDate.getFullYear() &&
                d.getMonth() === selectedDate.getMonth() &&
                d.getDate() === selectedDate.getDate();
        }) || [];
    }, [data, selectedDate]);

    if (isLoading) return <LargeLoadingUI />

    return (
        <div className="flex-1 overflow-y-auto pb-32 px-4 pt-12 hide-scrollbar">
            <div className="flex items-center justify-between mb-8 text-white px-2">
                <h1 className="text-2xl font-medium">Schedule</h1>
                <Button
                    size="icon"
                    onClick={() => router.push('/create-task')}
                    className="w-11 h-11 rounded-full bg-[#D1E8C4] flex items-center justify-center text-neutral-900 transition-transform hover:scale-105 active:scale-95 shadow-lg"
                >
                    <Plus className="size-6" />
                </Button>
            </div>


            <CalendarStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            <h2 className="text-white font-medium mb-4 px-2">
                {selectedDate.toDateString() === new Date().toDateString() ? "Today's Timeline" : `${selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} Timeline`}
            </h2>
            <Timeline tasks={filteredTasks} onTaskClick={(t) => {
                const parts = t.reminder_time.split('T');
                const rawDateStr = parts[0];
                const rawTimeStr = parts.length > 1 ? parts[1].substring(0, 5) : "00:00";
                
                // Construct a proper Date object
                const combinedDate = new Date(`${rawDateStr}T${rawTimeStr}:00`);

                setSelectedTask({
                    id: t.id?.toString() || Math.random().toString(),
                    title: t.content,
                    time: rawTimeStr,
                    date: combinedDate,
                    hashtags: t.hashtags?.map(h => h.name) || [],
                });
            }} />
            <TaskPopup
                task={selectedTask}
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
            />
        </div>
    )
}

export default SheduleScreen