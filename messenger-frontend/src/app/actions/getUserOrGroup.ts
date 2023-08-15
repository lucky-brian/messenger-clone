import axios from "axios";
import { getOneUserOrGroupRoute, host } from "../../utilAPI/APIRoute";

const getOneUserOrGroup = async (id?: string) => {
    if (!id) {
        return [];
    }

    try {
        const user = await axios.get(`${host}${getOneUserOrGroupRoute}${id}`);
        return user.data;

    } catch (error) {
        return [];
    }

}

export default getOneUserOrGroup;