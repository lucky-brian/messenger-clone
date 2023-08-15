import React from 'react'
import { userType } from '../../../store/slices/authSlice'
import UserBox from './UserBox'

interface UserListProps {
  item: userType[] | null
}

const UserList: React.FC<UserListProps> = ({ item }) => {
  return (
    <aside
      className=' fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-[304px] lg:block overflow-y-auto border-r border-gray-200 block w-full left-0'
    >
      <div className='px-5'>
        <div className=' flex justify-between mb-4 pt-4'>
          <div
            className='text-2xl font-bold text-neutral-800'
          >
            People
          </div>
        
        </div>
        {item?.map((item) => (
          <UserBox
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </aside>
  )
}

export default UserList