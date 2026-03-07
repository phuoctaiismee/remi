import Image from 'next/image'

const ProfileHeader = () => {
    return (
        <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-700 border-4 border-neutral-800 mb-4 relative">
                <Image
                    src="https://picsum.photos/seed/avatar/200/200"
                    alt="Profile"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                />
            </div>
            <h2 className="text-2xl font-semibold text-white">Tai Nguyen</h2>
            <p className="text-neutral-400">Product Designer</p>
        </div>
    )
}

export default ProfileHeader