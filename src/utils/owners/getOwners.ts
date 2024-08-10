import axios from "axios";
import { getToken } from "../auth/localStorage";

const BASE_URL = import.meta.env.VITE_BASE_URL_API;
const getOwners = async (): Promise<Array<Owner> | null> => {
  const token = getToken();
  try {
    const result = await axios.get(`${BASE_URL}/propietario`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data: Array<Owner> = result.data;

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getOwnerById = async (id: number): Promise<Owner | null> => {
  try {
    const token = localStorage.getItem("jwt");
    const result = await axios.get(`${BASE_URL}/propietario/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      const data: Owner = result.data;
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getOwners, getOwnerById };
