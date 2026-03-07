'use client'
import { Header, MainBentoCard, TaskList, SchedulingCard, ProgressCard } from './components'

const HomeScreen = () => {
    return (
        <div className="flex-1 overflow-y-auto px-4 pt-8 hide-scrollbar">
            <Header />
            <MainBentoCard />
            <TaskList />
            <SchedulingCard />
            <ProgressCard />
        </div>
    )
}

export default HomeScreen