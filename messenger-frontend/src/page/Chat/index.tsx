import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/slices/authSlice'
import DesktopSidebar from '../../components/sidebar/DesktopSidebar'
import MobileFooter from '../../components/sidebar/MobileFooter'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store/store'
import { Loading } from '../../components/Loading'
import ChatLayout from '../../app/chats/layout'

const Chat = () => {
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

    const { id } = useParams()

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
                            <div className={ id ? 'hidden lg:block' : ''}>
                                <MobileFooter />
                            </div>
                        </div >
                        <div>
                            <ChatLayout />
                        </div>
                    </div >
                )
            }
        </>
    )
}

export default Chat