import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL_API;
const getRenters = async (): Promise<Array<Renter> | null> => {
  const token = localStorage.getItem("jwt");
  try {
    const result = await axios.get(`${BASE_URL}/inquilino`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data: Array<Renter> = result.data;

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getRenterById = async (id: number): Promise<Renter | null> => {
  try {
    const token = localStorage.getItem("jwt");
    const result = await axios.get(`${BASE_URL}/inquilino/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      const data: Renter = result.data;
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getRenters, getRenterById };
