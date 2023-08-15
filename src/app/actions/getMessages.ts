import axios from "axios";
import { getChatRoute, host } from "../../utilAPI/APIRoute";

const getMessages = async (accessToken?: string, currentChatId?: string) => {
    if (accessToken == '' || currentChatId == '') {
        return [];
    }

    try {
        const { data } = await axios.get(`${host}${getChatRoute}/${currentChatId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        const fillter = data.sort((a: any, b: any) => a.createdAt.localeCompare(b.createdAt))
        return fillter;
    } catch (error) {
        return [];
    }
}

export default getMessages;