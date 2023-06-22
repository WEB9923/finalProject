import axios from "axios";
import BASE_URL from "./BASE_URL.js";

export const AddCartOrFavorites = async (destination, product) => {
   try {
      const res = await axios.post(`${BASE_URL}/${destination}`, product);
      return res.data;
   } catch (err) {
      throw new Error(err.response.data);
   }
}
