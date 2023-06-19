import axios from "axios";
import BASE_URL from "./BASE_URL.js";

export const GetSingleProduct = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/products/${id}`);
        // console.log(res.data)
        return res.data;
    } catch (err) {
        throw new Error(err.response.data);
    }
}
