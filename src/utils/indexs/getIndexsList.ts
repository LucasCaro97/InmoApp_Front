import axios from "axios";
import { getToken } from "../auth/localStorage";

type Result = {
  ok: boolean;
  data?: Array<Index>;
  message?: string;
};
const getIndexList = async (): Promise<Result> => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/indice`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 && response.data) {
      return { ok: true, data: response.data };
    }
    return { ok: false, message: "No se pudieron obtener los indices" };
  } catch (error) {
    return { ok: false, message: "Error al cargar los indices." };
  }
};
export { getIndexList };
