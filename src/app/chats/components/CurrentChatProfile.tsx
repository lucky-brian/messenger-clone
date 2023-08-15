import React from 'react'
import Avatar from '../../../components/Avatar';

export interface userProfile {
    id: string;
    username: string;
    name: string;
    email: string;
    createdAt: string;
    image: string | null;
    password: string;
    updateAt: string;
    isGroup: boolean;
}

interface CurrentChatProfileProps {
    initialProfile?: userProfile
}

const CurrentChatProfile: React.FC<CurrentChatProfileProps> = ({initialProfile}) => {
  return (
    <div className='flex justify-center m-auto pt-20'>
        <div className='flex flex-col'>
            <div>
                <Avatar user={initialProfile} profile={true} />
            </div>
            <div className='text-center pt-3 text-lg font-medium'>
                <span>{initialProfile?.isGroup ? initialProfile.name : initialProfile?.username}</span>
            </div>
        </div>
    </div>
  )
}

export default CurrentChatProfile