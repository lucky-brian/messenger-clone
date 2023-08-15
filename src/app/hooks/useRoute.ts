import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import useConversation from "./useConversation";
import { logout } from "./useLogout";


const useRoutes = () => {

  const path = useLocation();
  const { conversationId } = useConversation();
  const navigate = useNavigate();

  const routes = useMemo(() => [
    {
      label: 'Chat',
      href: '/chat',
      icon: HiChat,
      active: path.pathname !== '/user'
    },
    {
      label: 'Users',
      href: '/user',
      icon: HiUsers,
      active: path.pathname === '/user'
    },
    {
      label: 'Logout',
      onClick: () => logout(navigate),
      href: '#',
      icon: HiArrowLeftOnRectangle,
    }
  ], [path, conversationId]);

  return routes;
};

export default useRoutes;