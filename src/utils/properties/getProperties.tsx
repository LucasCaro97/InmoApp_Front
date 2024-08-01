import axios from "axios";
type Response = {
  ok: boolean;
  data?: Array<Property>;
  message?: string;
};
const getProperties = async (): Promise<Response> => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;
  const token = localStorage.getItem("jwt");
  try {
    const response = await axios.get(`${BASE_URL}/inmueble`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (Array.isArray(response.data)) {
      const data: Array<Property> = response.data;
      return { ok: true, data: data };
    }
    return { ok: false, message: "No se encontraron propiedades." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error al obtener las propiedades." };
  }
};
export { getProperties };
