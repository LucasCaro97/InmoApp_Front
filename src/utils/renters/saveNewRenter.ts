import axios from "axios";
type Result = {
  ok: boolean;
  message: string;
};

const saveNewRenter = async (renter: Renter): Promise<Result> => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;
  const token = localStorage.getItem("jwt");
  try {
    const response = await axios.post(`${BASE_URL}/inquilino`, renter, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      return { ok: true, message: "Inquilino creado exitosamente." };
    }
    return { ok: false, message: "No se pudo crear el inquilino." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error al crear el inquilino." };
  }
};
export { saveNewRenter };
