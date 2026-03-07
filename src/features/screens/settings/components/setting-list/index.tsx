import { Bell, Moon, Lock, HelpCircle, LogOut, ChevronRight } from "lucide-react";

const SettingList = () => {
    return (
        <>
            <div className="bg-neutral-900 rounded-[32px] overflow-hidden border border-neutral-800 mb-6">
                <div className="p-4 border-b border-neutral-800 flex items-center justify-between group cursor-pointer hover:bg-neutral-800/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                            <Bell className="w-5 h-5 text-neutral-300" />
                        </div>
                        <span className="text-white font-medium">Notifications</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-neutral-500" />
                </div>

                <div className="p-4 border-b border-neutral-800 flex items-center justify-between group cursor-pointer hover:bg-neutral-800/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                            <Moon className="w-5 h-5 text-neutral-300" />
                        </div>
                        <span className="text-white font-medium">Dark Mode</span>
                    </div>
                    <div className="w-12 h-6 bg-[#D1E8C4] rounded-full relative">
                        <div className="w-5 h-5 bg-neutral-900 rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                </div>

                <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-neutral-800/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                            <Lock className="w-5 h-5 text-neutral-300" />
                        </div>
                        <span className="text-white font-medium">Privacy & Security</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-neutral-500" />
                </div>
            </div>

            <div className="bg-neutral-900 rounded-[32px] overflow-hidden border border-neutral-800 mb-6">
                <div className="p-4 border-b border-neutral-800 flex items-center justify-between group cursor-pointer hover:bg-neutral-800/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                            <HelpCircle className="w-5 h-5 text-neutral-300" />
                        </div>
                        <span className="text-white font-medium">Help & Support</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-neutral-500" />
                </div>

                <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-neutral-800/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                            <LogOut className="w-5 h-5 text-red-500" />
                        </div>
                        <span className="text-red-500 font-medium">Log Out</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingList