import { TrendingUp } from 'lucide-react'

const ProgressCard = () => {
    return (
        <div className="bg-[#BEE3ED] rounded-[32px] p-6 mb-4 relative overflow-hidden">
            <div className="flex justify-between items-start mb-10">
                <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-neutral-800" />
                </div>
                <div className="flex bg-neutral-900/5 rounded-full p-1">
                    <button className="px-5 py-2 rounded-full text-sm font-medium text-neutral-600">Weekly</button>
                    <button className="px-5 py-2 rounded-full bg-neutral-900 text-white text-sm font-medium shadow-sm">Monthly</button>
                </div>
            </div>
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-sm font-semibold text-neutral-600/80 mb-2 uppercase tracking-wider">Your progress</p>
                    <h3 className="text-[1.75rem] font-medium leading-[1.1] tracking-tight">You are doing<br />well ☺️</h3>
                </div>
                <div className="text-[4rem] font-light tracking-tighter leading-none">
                    78<span className="text-4xl">%</span>
                </div>
            </div>
        </div>
    )
}

export default ProgressCard