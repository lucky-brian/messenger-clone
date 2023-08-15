import React, { useCallback, useState } from 'react'
import { userType } from '../../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Avatar from '../../../components/Avatar';

interface UserBoxProps {
    data: userType;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
    const session = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = useCallback(async (userId: string) => {
        navigate(`/chat/${userId}`)
        setIsLoading(false)
    }, [data]);
    return (
        <div
            onClick={() => handleClick(data.id)}
            className='w-full relative flex items-center p-2 hover:bg-neutral-100 rounded-lg transition cursor-pointer'
        >
            <Avatar user={data} />
            <div className='min-w-0 flex-1 ml-2'>
                <div className=' focus:outline-none'>
                    <div className='flex justify-between items-center mb-1'>
                        <p className='text-sm font-medium text-gray-900'>
                            {data.username}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserBox;