import { Award, Target, TrendingUp } from "lucide-react";

const Achievements = () => {
    return (
        <div className="bg-neutral-900 rounded-[32px] p-6 text-white border border-neutral-800">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D1E8C4]" /> Achievements
            </h3>
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                        <Target className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h4 className="font-medium">Early Bird</h4>
                        <p className="text-xs text-neutral-400">Completed 5 tasks before 9 AM</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                        <h4 className="font-medium">Productivity Master</h4>
                        <p className="text-xs text-neutral-400">Maintained a 10-day streak</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Achievements