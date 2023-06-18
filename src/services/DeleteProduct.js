import axios from "axios";
import BASE_URL from "./BASE_URL.js";

export const DeleteProduct = async (route,productId) => {
    try {
        const res = await axios.delete(`${BASE_URL}/${route}/${productId}`);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data);
    }
}
