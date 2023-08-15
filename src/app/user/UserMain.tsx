import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/slices/authSlice'
import DesktopSidebar from '../../components/sidebar/DesktopSidebar'
import MobileFooter from '../../components/sidebar/MobileFooter'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'
import UserLayout from '../../app/users/layout'
import { Loading } from '../../components/Loading'

const UserMain = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userString = localStorage.getItem('messenger');
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!userString) {
      navigate('/auth');
    } else {
      const user = JSON.parse(userString); // แปลง JSON string เป็น object
      const { created, updated, ...result } = user
      dispatch(login(result));
    }
      setIsLoading(false)
  }, [userString]);

  const currentUser = useSelector((state: RootState) => state.auth.user)

  return (
    <>
      {
        isLoading ? (
          <Loading />
        ) : (
          <div>
            <div>
              <DesktopSidebar currentUser={currentUser!} />
              <MobileFooter />
            </div >
            <div>
              <UserLayout />
            </div>
          </div >
        )
      }
    </>
  )
}

export default UserMain