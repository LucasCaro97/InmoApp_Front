import axios from "axios";
import { getToken } from "../auth/localStorage";
type Result = {
  ok: boolean;
  message?: string;
};
const editContract = async (
  id: string | undefined,
  contract: Contract
): Promise<Result> => {
  const token = getToken();
  if (!token) {
    return { ok: false, message: "La sesión ha expirado." };
  }
  if (!id) {
    return { ok: false, message: "No se ha proporcionado un id de contrato" };
  }
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;
  const {
    inmuebleId,
    inquilinoId,
    tipoContratoId,
    fechaInicio,
    fechaFin,
    observaciones,
    estadoContrato,
    importeBase,
    indice,
    actualizaCada,
  } = contract;

  try {
    const result = await axios.put(
      `${BASE_URL}/contrato/${id}`,
      {
        inmuebleId,
        inquilinoId,
        tipoContratoId,
        fechaInicio,
        fechaFin,
        observaciones,
        estadoContrato,
        importeBase,
        indice,
        actualizaCada,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (result.status === 200) {
      return { ok: true, message: "Contrato editado con éxito." };
    }
    return { ok: false, message: "No se pudo editar el contrato." };
  } catch (error) {
    return { ok: false, message: "Error al editar el contrato." };
  }
};

export { editContract };
