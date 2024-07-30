import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL_API;
const getOwners = async (): Promise<Array<Owner> | null> => {
  try {
    const token = localStorage.getItem("jwt");
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

export { getOwners };
