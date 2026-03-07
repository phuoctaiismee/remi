'use client'

import { SettingList } from "./components"

const SettingScreen = () => {
    return (
        <div className="flex-1 overflow-y-auto pb-32 px-4 pt-12 hide-scrollbar">
            <div className="flex items-center justify-between mb-8 text-white px-2">
                <h1 className="text-2xl font-medium">Settings</h1>
            </div>

            <SettingList />
        </div>
    )
}

export default SettingScreen