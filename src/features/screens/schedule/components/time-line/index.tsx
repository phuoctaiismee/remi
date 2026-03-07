
const Timeline = () => {
    return (
        <div className="relative pl-8 pr-2 space-y-6 before:absolute before:inset-0 before:ml-10 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-800 before:to-transparent">

            {/* Timeline Item 1 */}
            <div className="relative flex items-center justify-between group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-[#121212] bg-[#D1E8C4] absolute left-[-28px] top-1/2 -translate-y-1/2 z-10"></div>
                <div className="bg-white rounded-[24px] p-4 w-full ml-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-neutral-900">Morning Workout</h3>
                        <span className="text-xs font-medium text-neutral-500">08:00 AM</span>
                    </div>
                    <p className="text-sm text-neutral-500">Gym session with trainer</p>
                </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex items-center justify-between group">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-[#121212] bg-neutral-700 absolute left-[-28px] top-1/2 -translate-y-1/2 z-10"></div>
                <div className="bg-neutral-800 rounded-[24px] p-4 w-full ml-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-white">Webinar</h3>
                        <span className="text-xs font-medium text-neutral-400">11:00 AM</span>
                    </div>
                    <p className="text-sm text-neutral-400">Implementation of habits</p>
                </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex items-center justify-between group">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-[#121212] bg-neutral-700 absolute left-[-28px] top-1/2 -translate-y-1/2 z-10"></div>
                <div className="bg-neutral-800 rounded-[24px] p-4 w-full ml-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-white">Project Review</h3>
                        <span className="text-xs font-medium text-neutral-400">02:30 PM</span>
                    </div>
                    <p className="text-sm text-neutral-400">Design team sync</p>
                </div>
            </div>

        </div>
    )
}

export default Timeline