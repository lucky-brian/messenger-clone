import axios from "axios";
import { getUsersAndGroupsRoute, host } from "../../utilAPI/APIRoute";

const getChatList = async (accessToken?: string) => {
    if (!accessToken) {
        return [];
    }

    try {
        const {data} = await axios.get(`${host}${getUsersAndGroupsRoute}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return data;

    } catch (error) {
        return [];
    }

}

export default getChatList;