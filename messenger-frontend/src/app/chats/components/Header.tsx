import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { currentChat } from '../../../store/slices/chatSlice';
import Avatar from '../../../components/Avatar';
import ProfileDrawer from './ProfileDrawer';
import getOneUserOrGroup from '../../actions/getUserOrGroup';
import axios from 'axios';
import { getGroupMembersRoute, host } from '../../../utilAPI/APIRoute';
import { RootState } from '../../../store/store';


interface HeaderProps {
    conversation: string;
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
    const dispatch = useDispatch()
    const [currentChatUser, setCureentChatUser] = useState<any>()
    const [isGroupMembers, setIsGroupMembers] = useState<any>()
    const [drawerOpen, setDrawerOpen] = useState(false)

    const session = useSelector((state: RootState) => state.auth.user)

    useEffect(() => {
        const fetchData = async () => {
            const findOne = await getOneUserOrGroup(conversation)

            if (findOne.isGroup === true) {
                const data = await axios.get(`${host}${getGroupMembersRoute}${conversation}`, {
                    headers: {
                        'Authorization': `Bearer ${session?.accessToken}`
                    }
                })

                
                setIsGroupMembers(data.data)
            }

            // if(findOne.isGroup) {
            //     const getMembers = await getGroupMembers(session?.accessToken, conversation)
            //     console.log(getMembers) 
            // }

            setCureentChatUser(findOne)

        }
        fetchData();
    }, [conversation])


    const handleClick = () => {
        dispatch(currentChat(''))
    }


    return (
        <>
            <ProfileDrawer
                data={currentChatUser}
                membersData={isGroupMembers}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div
                className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'
            >
                <div
                    className=' flex gap-3 items-center'
                >
                    <Link to={'/chat'} onClick={() => handleClick()} className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'>
                        <HiChevronLeft size={30} />
                    </Link>
                    <Avatar user={currentChatUser} />
                    <div className=' flex flex-col font-semibold'>
                        <div>
                            {currentChatUser && currentChatUser.isGroup ? currentChatUser.name : currentChatUser && currentChatUser.username}
                        </div>

                    </div>
                </div>
                <HiEllipsisHorizontal
                    onClick={() => setDrawerOpen(true)}
                    className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
                    size={32} />
            </div>

        </>
    )
}

export default Header