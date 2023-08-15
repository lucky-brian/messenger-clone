import axios from "axios";
import { getGroupMembersRoute, host } from "../../utilAPI/APIRoute";

const getGroupMembers = async (accessToken?: string, currentChatId?: string) => {
    if (accessToken === '' || currentChatId === '') {
        return [];
    }

    try {
        const respone = await axios.get(`${host}${getGroupMembersRoute}${currentChatId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return respone.data;


    } catch (error) {
        return [];
    }
}

export default getGroupMembers;