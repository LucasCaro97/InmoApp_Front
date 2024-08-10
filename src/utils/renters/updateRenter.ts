import axios from "axios";
import { getToken } from "../auth/localStorage";
type Result = {
  ok: boolean;
  message: string;
};
const updateRenter = async (renter: Renter): Promise<Result> => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;
  try {
    const token = getToken();
    const id = renter.id;
    const result = await axios.put(`${BASE_URL}/inquilino/${id}`, renter, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      return { ok: true, message: "Inquilino actualizado con exito." };
    }
    return { ok: false, message: "No se pudo actualizar el inquilino." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error al actualizar el inquilino." };
  }
};
export { updateRenter };
