import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL_API;
const token = localStorage.getItem("jwt");
type Response = {
  ok: boolean;
  message: string;
};
const deleteOwner = async (id: number): Promise<Response> => {
  const result = await axios.delete(`${BASE_URL}/propietario/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  console.log(result)
  return { ok: true, message: result.data.mensaje };
};
export { deleteOwner };
