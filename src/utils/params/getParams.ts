import axios from "axios";
import { getToken } from "../auth/localStorage";

const token = getToken();
const BASE_URL = import.meta.env.VITE_BASE_URL_API;
const getParams = async (param: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${param}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { getParams };
