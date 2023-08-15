import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"


export function logout(navigate: any) {
    localStorage.clear();
    toast.success('Logout complete');
    navigate('/auth');
}