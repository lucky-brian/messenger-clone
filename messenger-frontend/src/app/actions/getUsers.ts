import axios from "axios";
import { getAllUser, host } from "../../utilAPI/APIRoute";

const getUsers = async (accessToken?: string) => {
    if (!accessToken) {
        return [];
    }

    try {
        const user = await axios.get(`${host}${getAllUser}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return user.data;

    } catch (error) {
        return [];
    }

}

export default getUsers;