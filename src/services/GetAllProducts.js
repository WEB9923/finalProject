import axios from "axios";

export const GetAllProducts = async (searchParam,limit=20) => {
    try {
        const res = await axios.get(`http://localhost:8080/products/?${searchParam}&_limit=${limit}`);
        return {
            products:res.data,
            totalCount:res.headers["x-total-count"]
        };
    } catch (err) {
        throw new Error(err.response.data);
    }
}

