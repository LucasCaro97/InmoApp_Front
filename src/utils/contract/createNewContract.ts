import axios from "axios";
import { getToken } from "../auth/localStorage";

type Response = {
  ok: boolean;
  message?: string;
};
const createNewContract = async (contract: Contract): Promise<Response> => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;
  const token = getToken();
  try {
    const response = await axios.post(`${BASE_URL}/contrato`, contract, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      return { ok: true, message: "Contrato creado con éxito" };
    }
    return { ok: false, message: "No se pudo crear el contrato." };
  } catch (error) {
    return { ok: false, message: "Error al crear el contrato." };
  }
};
export { createNewContract };
