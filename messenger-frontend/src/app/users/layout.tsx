import { useSelector } from 'react-redux';
import UserList from './components/UserList'
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import EmptyState from '../../components/EmptyState';
import getUsers from '../actions/getUsers';

const UserLayout = () => {
  const session = useSelector((state: RootState) => state.auth.user);
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers(session?.accessToken);
        const filterUser = usersData.filter((user: any) => user.username !== session?.username)
        setUsers(filterUser);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <div>
      {
        users && <UserList item={users} />
      }
      <div className="hidden lg:block lg:pl-96 h-screen">
        <EmptyState />
      </div>
    </div>
  )
}

export default UserLayout