import axios from "axios";
import { getToken } from "../auth/localStorage";

type Result = {
  ok: boolean;
  message: string;
};
type Param = {
  id: number;
  nombre: string;
};
const updateParam = async (
  param: Param,
  tipoParametro: string
): Promise<Result> => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;
  const token = getToken();
  try {
    const result = await axios.put(
      `${BASE_URL}/${tipoParametro}/${param.id}`,
      param,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (result.status === 200) {
      return { ok: true, message: "Parámetro actualizado con éxito." };
    }
    return { ok: false, message: "No se pudo actualizar el parámetro." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al actualizar el parámetro." };
  }
};
export { updateParam };
