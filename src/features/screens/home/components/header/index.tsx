import { Bell } from 'lucide-react'
import Image from 'next/image'

const Header = () => {
    return (
        <div className="flex justify-between items-start mb-8 text-white px-2">
            <div>
                <h1 className="text-2xl font-medium leading-tight tracking-tight">
                    Hi 👋 Tai!<br />
                    <span className="text-neutral-400 font-normal">Welcome back</span>
                </h1>
            </div>
            <div className="flex items-center gap-3">
                <button className="w-11 h-11 rounded-full bg-neutral-800/50 flex items-center justify-center border border-neutral-700/50">
                    <Bell className="w-5 h-5 text-neutral-300" />
                </button>
                <div className="w-11 h-11 rounded-full overflow-hidden bg-neutral-700 border border-neutral-600">
                    <Image
                        src="https://picsum.photos/seed/avatar/100/100"
                        alt="Profile"
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                </div>
            </div>
        </div>
    )
}

export default Header