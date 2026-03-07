import { AlarmClock, MoreHorizontal, Wifi } from 'lucide-react'

const TaskList = () => {
    return (
        <div className="bg-white rounded-[32px] p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-[60px] h-[60px] rounded-full bg-neutral-900 text-white flex flex-col items-center justify-center leading-none">
                    <span className="text-xl font-medium">11</span>
                    <span className="text-[10px] font-medium text-neutral-400 mt-1">AM</span>
                </div>
                <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                        Webinar <span className="text-blue-500"><Wifi className="w-4 h-4" /></span>
                    </h3>
                    <p className="text-neutral-500 text-sm">Implementation of habits.</p>
                </div>
            </div>
            <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center transition-colors hover:bg-neutral-50">
                    <MoreHorizontal className="w-5 h-5 text-neutral-600" />
                </button>
                <button className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center transition-transform active:scale-95">
                    <AlarmClock className="w-4 h-4 text-white" />
                </button>
            </div>
        </div>
    )
}

export default TaskList