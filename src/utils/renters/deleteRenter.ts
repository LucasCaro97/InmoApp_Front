import axios from "axios";
import { getToken } from "../auth/localStorage";
const BASE_URL = import.meta.env.VITE_BASE_URL_API;
const token = getToken();
type Response = {
  ok: boolean;
  message: string;
};
const deleteRenter = async (id: number): Promise<Response> => {
  const result = await axios.delete(`${BASE_URL}/inquilino/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  console.log(result);
  return { ok: true, message: result.data.mensaje };
};
export { deleteRenter };
