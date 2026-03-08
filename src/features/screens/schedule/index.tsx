'use client'

import { Calendar } from "lucide-react"
import { CalendarStrip, Timeline } from "./components"

import { createSampleTask } from "@/lib/db"

const SheduleScreen = () => {
    return (
        <div className="flex-1 overflow-y-auto pb-32 px-4 pt-12 hide-scrollbar">
            <div className="flex items-center justify-between mb-8 text-white px-2">
                <h1 className="text-2xl font-medium">Schedule</h1>
                <div className="flex gap-3">
                    <button 
                        onClick={async () => {
                            try {
                                await createSampleTask(5);
                                alert("Đã tạo task mẫu! Sẽ có thông báo sau 5 giây.");
                            } catch (error) {
                                console.error(error);
                                alert("Có lỗi xảy ra khi tạo task");
                            }
                        }}
                        className="px-4 h-11 rounded-full bg-indigo-600/80 flex items-center justify-center border border-indigo-500/50 text-sm font-medium hover:bg-indigo-600 transition-colors"
                    >
                        Test Task (5s)
                    </button>
                    <button className="w-11 h-11 rounded-full bg-neutral-800/50 flex items-center justify-center border border-neutral-700/50">
                        <Calendar className="w-5 h-5 text-neutral-300" />
                    </button>
                </div>
            </div>

            <CalendarStrip />
            <h2 className="text-white font-medium mb-4 px-2">Today&apos;s Timeline</h2>
            <Timeline />
        </div>
    )
}

export default SheduleScreen