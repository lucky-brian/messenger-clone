import axios from "axios";
import { getOneUserById, host } from "../../utilAPI/APIRoute";

const getUserById = async (userId?: string) => {
    if (!userId) {
        return [];
    }

    try {
        const user = await axios.get(`${host}${getOneUserById}${userId}`);
        return user.data;

    } catch (error) {
        return [];
    }

}

export default getUserById;