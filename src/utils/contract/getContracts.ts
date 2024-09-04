import axios from "axios";
import { getToken } from "../auth/localStorage";

type Response = {
  ok: boolean;
  message?: string;
  data?: Array<Contract>;
};

const getContracts = async (): Promise<Response> => {
  try {
    const token = getToken();
    const BASE_URL = import.meta.env.VITE_BASE_URL_API;
    const result = await axios.get(`${BASE_URL}/contrato`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      return { ok: true, data: result.data };
    }
    return { ok: false, message: "No se pudo obtener los contratos." };
  } catch (error) {
    return { ok: false, message: "Error al intentar obtener los contratos." };
  }
};

export { getContracts };
