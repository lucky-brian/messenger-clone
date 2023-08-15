import React, { useState } from 'react'
import useConversation from '../../hooks/useConversation'
import clsx from 'clsx';
import { MdOutlineGroupAdd } from 'react-icons/md'
import ChatBox from './ChatBox';
import { userType } from '../../../store/slices/authSlice';
import { useParams } from 'react-router-dom';
import GroupChatModal from './GroupChatModal';

interface ChatListProps {
    item: userType[] | null
    users: userType[]
}

const ChatList: React.FC<ChatListProps> = ({ item, users }) => {
    const { isOpen, conversationId } = useConversation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams()
    return (
        <>
            <GroupChatModal
                users={users}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <aside
                className={clsx(`fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 
            lg:w-[304px] lg:block overflow-y-auto border-r
             border-gray-200`,
                    isOpen ? 'hidden' : 'block w-full left-0'
                )}
            >
                <div className='px-5'>
                    <div className=' flex justify-between mb-4 pt-4'>
                        <div
                            className='text-2xl font-bold text-neutral-800'
                        >
                            Messages
                        </div>
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className=' rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-70 transition'
                        >
                            <MdOutlineGroupAdd size={20} />
                        </div>
                    </div>
                    {
                        item?.map((item) => (
                            <ChatBox
                                key={item.id}
                                data={item}
                                selected={id == item.id}
                            />
                        ))
                    }
                </div>
            </aside>
        </>
    )
}

export default ChatList