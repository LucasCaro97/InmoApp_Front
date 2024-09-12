import axios from "axios";
import { getToken } from "../auth/localStorage";

type Result = {
  ok: boolean;
  data?: SpreadSheet;
  message?: string;
};
const getSpreadSheet = async (month: number, year: number): Promise<Result> => {
  try {
    const token = getToken();
    const BASE_URL = import.meta.env.VITE_BASE_URL_API;
    const response = await axios.get(
      `${BASE_URL}/planillamensual/${month}/${year}`,
      {
        headers: {
          Authorization: `Bearer, ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return { ok: true, data: response.data };
    }
    return { ok: false, message: "No se encontraron resultados." };
  } catch (error) {
    return { ok: false, message: "Error al solicitar la planilla." };
  }
};

export { getSpreadSheet };
