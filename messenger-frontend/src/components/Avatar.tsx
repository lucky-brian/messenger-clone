import React from 'react'
import { userType } from '../store/slices/authSlice'
import clsx from 'clsx';
import { userProfile } from '../app/chats/components/CurrentChatProfile';

interface AvatarProps {
    user?: userType | null | userProfile
    profile? : boolean
}

const Avatar: React.FC<AvatarProps> = ({ user, profile }) => {

    const avatar = 'https://i.pinimg.com/564x/02/72/35/02723528ae01d17bbf67ccf6b8da8a6b.jpg'
    return (
        <div
            className=' relative'
        >
            <div
                className={clsx(`relative inline-block rounded-full overflow-hidden `, 
                profile ? `h-28 w-28 md:h-32 md:w-32` : 'h-9 w-9 md:h-11 md:w-11'
                )}
            >
                    <img src={user?.image ? `${user.image}` : `${avatar}`} alt="avatar" />
            </div>
            <span
                className=' absolute block rounded-full bg-green-500 ring-2 bottom-0 ring-white right-0 h-2 w-2 md:h-3 md:w-3'
            >

            </span>
        </div>
    )
}

export default Avatar