import { useState } from "react"
import useRoutes from "../../app/hooks/useRoute"
import DesktopItem from "./DesktomItem"
import { isLogin, userType } from "../../store/slices/authSlice";
import Avatar from "../Avatar";
import SettingModal from "./SettingModal";
import PINmodal from "../PINmodal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface DesktopSidebarProps {
  currentUser: userType | null;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes()
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()

  const isConfirmPIN = useSelector((state: RootState) => state.auth.isNotconfirmPIN)

  return (
    <>
      <SettingModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <PINmodal
        isOpen={isConfirmPIN}
        onClose={() => dispatch(isLogin())}
      />
      <div
        className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:px-6 
      lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex 
      lg:flex-col justify-between"
      >
        <nav className=" mt-4 flex flex-col justify-between">
          <ul
            role="list"
            className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <div
          className="mt-4 flex flex-col justify-between items-center"
        >
          <div
            onClick={() => setIsOpen(true)}
            className=" cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
          </div>
        </div>
      </div>
    </>
  )
}

export default DesktopSidebar