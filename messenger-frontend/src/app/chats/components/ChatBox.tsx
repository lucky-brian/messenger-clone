import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from '../../../components/Avatar';
import { currentChat } from '../../../store/slices/chatSlice';
import clsx from 'clsx';
import AvatarGroup from './AvatarGroup';
import axios from 'axios';
import { getGroupMembersRoute, host } from '../../../utilAPI/APIRoute';
import { RootState } from '../../../store/store';

interface ChatBoxProps {
  data: any;
  selected: boolean
}

const ChatBox: React.FC<ChatBoxProps> = ({ data, selected }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken)

  const [group, setGroup] = useState()

  useEffect(() => {

    const getDataGroup = async () => {

      if (data.isGroup) {
        const { data } = await axios.get(`${host}${getGroupMembersRoute}${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        setGroup(data)
      }
    }

    getDataGroup();
  }, [data])

  const handleClick = useCallback(async (userId: string) => {
    dispatch(currentChat(userId))
    navigate(`/chat/${userId}`)

  }, [data]);



  return (
    <div
      onClick={() => handleClick(data.id)}
      className={clsx(`w-full relative flex items-center p-2 hover:bg-neutral-100 
      rounded-lg transition cursor-pointer`,
        selected ? 'bg-neutral-100' : ''
      )}
    >
      {data.isGroup ? (
        <Avatar user={data} />
      ) : (
        <Avatar user={data} />
      )

      }
      <div className='min-w-0 flex-1 ml-2'>
        <div className=' focus:outline-none'>
          <div className='flex flex-col mb-1'>
            <p className=' font-medium text-gray-900'>
              {data.isGroup ? data.name : data.username}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ChatBox  