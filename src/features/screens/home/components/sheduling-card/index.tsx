import { Settings2 } from 'lucide-react'

const SchedulingCard = () => {
    return (
        <div className="bg-[#FDF1B0] rounded-[32px] p-6 mb-4">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Set Reminder</h3>
                <button className="w-10 h-10 rounded-full border border-neutral-900/10 flex items-center justify-center bg-white/30">
                    <Settings2 className="w-5 h-5" />
                </button>
            </div>
            <div className="flex justify-between items-center bg-white/60 rounded-[24px] p-5">
                <div className="text-4xl font-medium tracking-tighter">14:30</div>
                <div className="flex flex-col gap-1.5 items-end">
                    <div className="w-12 h-1.5 bg-neutral-900 rounded-full"></div>
                    <div className="w-8 h-1.5 bg-neutral-900/30 rounded-full"></div>
                    <div className="w-10 h-1.5 bg-neutral-900/30 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}

export default SchedulingCard