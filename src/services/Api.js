import axios from "axios";
import BASE_URL from "./BASE_URL.js";

axios.interceptors.request.use((config) => {
    config.baseURL = BASE_URL;
    const token = localStorage.getItem("token");
    if(token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
},error => Promise.reject(error));

// login //
export const loginUser = async (loginUserDetails) => {
    try {
        const res = await axios.post(`${BASE_URL}/login`,{
            email:loginUserDetails.email,
            password:loginUserDetails.password
        });
        if(res?.data.accessToken){
            return res.data;
        }
    } catch (err) {
        throw new Error(err.response.data);
    }
}

// register //
export const registerUser = async (userData) => {
    try {
        const res = await axios.post(`${BASE_URL}/register`, userData);
        return res.data;
    } catch (err) {
        // console.log(err.response.data)
        throw new Error(err.response.data);
    }
}

