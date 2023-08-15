import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import CurrentChatProfile from './CurrentChatProfile'
import getOneUserOrGroup from '../../actions/getUserOrGroup'
import { Message } from '../layout'

interface BodyProps {
    currentUser: string
    initialMessages: any
}

const Body: React.FC<BodyProps> = ({ initialMessages, currentUser }) => {
    const [profile, setProfile] = useState()
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // console.log(initialMessages)
        setMessages(initialMessages);
    }, [initialMessages]);


    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    useEffect(() => {
        const fetchData = async () => {
            const findOne = await getOneUserOrGroup(currentUser)
            setProfile(findOne)
        }
        fetchData();
    }, [currentUser])

    return (
        <div className='flex-1 overflow-y-auto'>
            <CurrentChatProfile initialProfile={profile} />
            {
                messages?.map((message: any) => (
                    <MessageBox
                        key={message.id}
                        data={message}
                    />
                ))
            }
            <div ref={bottomRef} className='pt-10'>

            </div>

        </div >

    )
}

export default Body