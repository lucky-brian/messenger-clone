import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export async function POST(request: Request) {
    try {
        const currentUser = useSelector((state: RootState) => state.auth.user);
        const body = await request.json();
    } catch (error) {
        return { message: 'something is wrong i can feel' }
    }
}