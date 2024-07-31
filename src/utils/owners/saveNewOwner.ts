import axios from "axios";
type Result = {
  ok: boolean;
  message: string;
};

const saveNewOwner = async (owner: Owner): Promise<Result> => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;
  const token = localStorage.getItem("jwt");
  try {
    const response = await axios.post(`${BASE_URL}/propietario`, owner, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      return { ok: true, message: "Propitario creado exitosamente." };
    }
    return { ok: false, message: "No se pudo crear el propietario." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error al crear el propietario." };
  }
};
export { saveNewOwner };
