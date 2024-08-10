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
const saveNewParam = async (
  param: Param,
  tipoParametro: string
): Promise<Result> => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;
  const token = getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/${tipoParametro}`,
      { nombre: param },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      return { ok: true, message: "Se a creado el parámetro con exito." };
    }
    return { ok: false, message: "No se pudo crear el parámetro." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error al crear el parámetro." };
  }
};
export { saveNewParam };
