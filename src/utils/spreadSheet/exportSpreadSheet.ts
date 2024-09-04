import axios from "axios";

const exportSpreadSheet = async (month: string, year: string) => {
  try {
    const BASE_URL = import.meta.env.VITE_BASE_URL_API;
    const result = await axios.get(
      `${BASE_URL}/planillamensual/exportar/${month}/${year}`
    );
    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export { exportSpreadSheet };
