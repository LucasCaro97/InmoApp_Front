import axios from "axios";
import { getToken } from "../auth/localStorage";
type Result = {
  ok: boolean;
  message: string;
};
const deleteContract = async (id: string): Promise<Result> => {
  if (!id) {
    return { ok: false, message: "No se ha proporcionado un id de contrato." };
  }
  try {
    const token = getToken();
    const BASE_URL = import.meta.env.VITE_BASE_URL_API;
    const result = await axios.delete(`${BASE_URL}/contrato/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      return { ok: true, message: "Contrato eliminado con exito." };
    }
    return { ok: true, message: "No se pudo eliminar el contrato." };
  } catch (error) {
    return { ok: false, message: "Error al eliminar el contrato." };
  }
};

export { deleteContract };
