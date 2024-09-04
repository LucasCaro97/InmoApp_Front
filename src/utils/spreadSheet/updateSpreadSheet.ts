import axios from "axios";
import { getToken } from "../auth/localStorage";

type Data = {
  id: number;
  mes: number;
  anio: number;
  detalles: string | null;
};
type Result = {
  ok: boolean;
  data?: Data;
  message?: string;
};

const updateSpreadSheet = async (
  month: string,
  year: string
): Promise<Result> => {
  try {
    const BASE_URL = import.meta.env.VITE_BASE_URL_API;
    const token = getToken();
    const result = await axios.post(
      `${BASE_URL}/planillamensual/${month}/${year}`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (result.status === 200) {
      return { ok: true, data: result.data };
    }
    return { ok: false, message: "No se pudo obtener el reporte." };
  } catch (error) {
    return { ok: false, message: "Error al obtener el reporte." };
  }
};
export { updateSpreadSheet };
