import { useEffect, useState } from 'react'

import useConversation from '../hooks/useConversation'
import EmptyState from '../../components/EmptyState'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import ChatList from './components/ChatList'
import getChatList from '../actions/getChat'
import { useParams } from 'react-router-dom'
import { currentChat } from '../../store/slices/chatSlice'
import Header from './components/Header'
import Body from './components/Body'
import Form from './components/Form'
import { Loading } from '../../components/Loading'
import { getChatGroupRoute, getChatRoute, getOneUserOrGroupRoute, host } from '../../utilAPI/APIRoute'
import axios from 'axios'
import getUsers from '../actions/getUsers'
import { toast } from 'react-hot-toast'
import io from 'socket.io-client'

export const socket = io('ws://localhost:3000')

export interface Message {
  id: string;
  body: string;
  createdAt: Date;
  sender: {
    id: string;
    username: string;
  };
}

const ChatLayout = () => {
  const session = useSelector((state: RootState) => state.auth.user);
  const { isOpen } = useConversation()
  const [conversation, setConversation] = useState([])
  const [users, setUsers] = useState([])
  const [message, setMessages] = useState<Message[]>([])
  const dispatch = useDispatch()

  const [isLoading, setIsloading] = useState(false)


  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined) {
      dispatch(currentChat(id))
      setIsloading(false)
    } else (
      dispatch(currentChat(''))
    )
  }, [id])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to websocket');
    });
  }, [])

  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, []);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const { data } = await axios.get(`${host}${getOneUserOrGroupRoute}${id}`);

        if (data.isGroup === true) {
          const { data } = await axios.get(`${host}${getChatGroupRoute}${id}`, {
            headers: {
              'Authorization': `Bearer ${session?.accessToken}`
            }
          })
          const fillter = data.sort((a: any, b: any) => a.createdAt.localeCompare(b.createdAt))
          setMessages(fillter)

        } else {
          const { data } = await axios.get(`${host}${getChatRoute}${id}`, {
            headers: {
              'Authorization': `Bearer ${session?.accessToken}`
            }
          })
          const fillter = data.sort((a: any, b: any) => a.createdAt.localeCompare(b.createdAt))
          setMessages(fillter)
        }

      } catch (error) {
        toast.error('Error fetching message');
      }
    }

    fetchMessage();
  }, [id])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getChatList(session?.accessToken);
        const fillter = usersData.filter((user: any) => user.id != session?.id)
        setConversation(fillter)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };


    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersData = await getUsers(session?.accessToken);
        const filterUser = usersData.filter((user: any) => user.username !== session?.username)
        setUsers(filterUser);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUser();
  }, [id]);



  const currentChatId = useSelector((state: RootState) => state.chat.currentChatId)

  if (!currentChatId) {
    return (
      <div>
        <div>
          {
            conversation && <ChatList item={conversation} users={users} />
          }
        </div>
        <div
          className={clsx("lg:pl-96 h-screen lg:block",
            isOpen ? "block" : "hidden"
          )}
        >
          <div className='h-full flex flex-col lg:block'>
            <EmptyState />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {
        isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className=' hidden lg:block'>
              <ChatList item={conversation} users={users} />
            </div>
            <div
              className='lg:pl-96 h-screen flex flex-col'
            >
              <Header conversation={currentChatId} />
              <Body currentUser={currentChatId} initialMessages={message} />
              <Form />
            </div>
          </div>
        )
      }
    </>


  )
}

export default ChatLayout