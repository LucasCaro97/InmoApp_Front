import axios from "axios";
type Response = {
  ok: boolean;
  data?: Property;
  message?: string;
};
const getPropertyById = async (id: number): Promise<Response> => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;
  const token = localStorage.getItem("jwt");
  try {
    const response = await axios.get(`${BASE_URL}/inmueble/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const data: Property = response.data;
      return { ok: true, data: data };
    }
    return { ok: false, message: "No se encontraron propiedades." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error al obtener las propiedades." };
  }
};
export { getPropertyById };
