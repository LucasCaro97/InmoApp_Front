import axios from "axios";
import { getToken } from "../auth/localStorage";

type Response = {
  ok: boolean;
  data?: Array<ContractType>;
};
const getContractTypes = async (): Promise<Response> => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;
  const token = getToken();
  try {
    const result = await axios.get(`${BASE_URL}/tipocontrato`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (Array.isArray(result.data)) {
      return { ok: true, data: result.data };
    }
    return { ok: false };
  } catch (error) {
    return { ok: false };
  }
};
export { getContractTypes };
