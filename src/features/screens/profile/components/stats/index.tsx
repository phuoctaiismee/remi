import { CheckCircle2, Zap } from 'lucide-react'

const Stats = () => {
    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#BEE3ED] rounded-[24px] p-5 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-5 h-5 text-neutral-800" />
                </div>
                <span className="text-2xl font-bold text-neutral-900">128</span>
                <span className="text-xs font-medium text-neutral-600 uppercase tracking-wider">Tasks Done</span>
            </div>
            <div className="bg-[#FDF1B0] rounded-[24px] p-5 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center mb-3">
                    <Zap className="w-5 h-5 text-neutral-800" />
                </div>
                <span className="text-2xl font-bold text-neutral-900">12</span>
                <span className="text-xs font-medium text-neutral-600 uppercase tracking-wider">Day Streak</span>
            </div>
        </div>
    )
}

export default Stats