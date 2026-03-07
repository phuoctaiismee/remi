
const CalendarStrip = () => {
    return (
        <div className="flex justify-between items-center mb-8 px-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => {
                const date = i + 7;
                const isActive = day === 'Thu';
                return (
                    <div key={day} className={`flex flex-col items-center gap-2 ${isActive ? 'bg-[#D1E8C4] text-neutral-900 rounded-full py-3 px-2' : 'text-neutral-400'}`}>
                        <span className="text-xs font-medium uppercase">{day}</span>
                        <span className={`text-lg font-semibold ${isActive ? 'w-8 h-8 bg-white rounded-full flex items-center justify-center' : ''}`}>{date}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default CalendarStrip