import axios from "axios";
import { getToken } from "../auth/localStorage";
type Result = {
  ok: boolean;
  message: string;
};
const updateOwner = async (owner: Owner): Promise<Result> => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;
  try {
    const token = getToken();
    const id = owner.id;
    const result = await axios.put(`${BASE_URL}/propietario/${id}`, owner, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      return { ok: true, message: "Propietario actualizado con exito." };
    }
    return { ok: false, message: "No se pudo actualizar el propietario." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error al actualizar el propietario." };
  }
};
export { updateOwner };
