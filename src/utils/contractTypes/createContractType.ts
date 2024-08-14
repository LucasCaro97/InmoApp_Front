import axios from "axios";
import { getToken } from "../auth/localStorage";

type Result = {
  ok: boolean;
  message?: string;
};
const createContractType = async (name: string): Promise<Result> => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;
  const token = getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/tipocontrato`,
      { nombre: name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response)
    if (response.status === 201) {
      return { ok: true, message: "Tipo de contrato guardado con éxito" };
    }
    return { ok: false, message: "No se pudo crear el tipo de contrato" };
  } catch (error) {
    return { ok: false, message: "Error al crear el tipo de contrato" };
  }
};
export { createContractType };
