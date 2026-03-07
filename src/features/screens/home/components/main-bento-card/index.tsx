import { Calendar, Share2, Plus } from "lucide-react";
import Link from "next/link";
const MainBentoCard = () => {
    return (
        <div className="bg-[#D1E8C4] rounded-[32px] p-6 mb-4 relative">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2 text-neutral-800 font-medium bg-white/40 px-3 py-1.5 rounded-full text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>10 Thu</span>
                </div>
                <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center transition-colors hover:bg-white/60">
                        <Share2 className="w-4 h-4" />
                    </button>
                    <Link
                        href="/create-task"
                        className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center transition-transform active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                    </Link>
                </div>
            </div>
            <p className="text-sm font-semibold text-neutral-600/80 mb-2 uppercase tracking-wider">Current tasks</p>
            <h2 className="text-[2.5rem] font-medium leading-[1.1] tracking-tight mb-8">
                You have 3<br />
                tasks <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-red-400/30 text-red-500 text-sm font-medium align-middle mx-1 bg-red-50/50">High ~</span> for today
            </h2>
            <div className="flex gap-4 text-sm font-medium text-neutral-500 border-t border-neutral-900/10 pt-5">
                <span>#shopping</span>
                <span>#renovation</span>
                <span>#planning</span>
            </div>
        </div>
    )
}

export default MainBentoCard