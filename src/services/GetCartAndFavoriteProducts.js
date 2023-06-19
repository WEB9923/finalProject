import axios from "axios";
import BASE_URL from "./BASE_URL.js";


export const GetCartAndFavoriteProducts = async (route) => {
    try {
        const res = await axios.get(`${BASE_URL}/${route}`);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data);
    }
}
