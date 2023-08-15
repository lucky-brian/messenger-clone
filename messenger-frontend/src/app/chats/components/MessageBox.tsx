import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import Avatar from '../../../components/Avatar';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { userType } from '../../../store/slices/authSlice';

// interface userType {
//     id: string;
//     username: string;
//     email: string;
//     createdAt: string;
//     image: string | null;
//     password: string;
//     update: string;
//     updatedAt: string;
// }


interface dataMessage {
    body: string;
    group: boolean;
    id: string;
    image: string | null;
    createdAt: string;
    receiver: userType;
    sender: userType;
}

interface MessageBoxProps {
    data: dataMessage
}

const MessageBox: React.FC<MessageBoxProps> = ({ data }) => {
    const [isOwn, setIsOwn] = useState(false)

    const currentUser = useSelector((state: RootState) => state.auth.user?.username)

    useEffect(() => {
        if (currentUser === data.sender.username) {
            setIsOwn(true)
        } else {
            setIsOwn(false)
        }
    }, [data])


    const container = clsx(
        "flex gap-3 p-4 items-center",
        isOwn && "justify-end"
    );

    const avatar = clsx(
        isOwn && "order-2"
    );

    const body = clsx(
        "flex flex-col gap-2",
        isOwn && "items-end"
    );

    const message = clsx(
        "text-sm w-fit overflow-hidden transition",
        isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
        data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
    );

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>

            <div className={body}>
                <div className='flex items-center gap-1'>
                    <div className='text-sm text-gray-500 '>
                        {data.sender.username}
                    </div>

                </div>
                <div className={message}>
                    {data.body}
                </div>
            </div>
        </div>
    )
}

export default MessageBox