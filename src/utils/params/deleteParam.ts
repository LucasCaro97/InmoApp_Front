import axios from "axios";

type Response = {
  ok: boolean;
  message: string;
};
const deleteParam = async (
  id: number,
  tipoParametro: string
): Promise<Response> => {
  const token = localStorage.getItem("jwt");
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;
  try {
    const result = await axios.delete(`${BASE_URL}/${tipoParametro}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return { ok: true, message: "Parametro eliminado correctamente" };
  } catch (error) {
    console.log(error);
    return { ok: false, message: `No se puedo eliminar el parametro: ${id}` };
  }
};
export { deleteParam };
