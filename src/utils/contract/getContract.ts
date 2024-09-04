import axios from "axios";
import { getToken } from "../auth/localStorage";
type Response = {
  ok: boolean;
  message?: string;
  data?: Contract;
};
const getContract = async (id: string): Promise<Response> => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;
  const token = getToken();
  try {
    const result = await axios.get(`${BASE_URL}/contrato/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      return { ok: true, data: result.data };
    }
    return { ok: false, message: "No se econtró el contrato." };
  } catch (error) {
    return { ok: false, message: "Error al obtener el contrato." };
  }
};
export { getContract };
