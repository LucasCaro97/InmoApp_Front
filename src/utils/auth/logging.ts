import axios, { AxiosResponse } from "axios";

const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

interface Response {
  status: number;
  token: string;
}
interface Result {
  ok: boolean;
  message?: string;
}
const logging = async (email: string, password: string): Promise<Result> => {
  try {
    const response: AxiosResponse<Response> = await axios.post(
      `${BASE_URL_API}/auth/login`,
      {
        email,
        password,
      }
    );
    if (response.status === 200 && response.data.token) {
      const token = response.data.token;
      localStorage.setItem("jwt", token);
      return { ok: true };
    } else {
      return { ok: false, message: "Error interno al inicar sesión" };
    }
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      return {
        ok: false,
        message: "Email o contraseña incorrecta",
      };
    }
    return { ok: false, message: "Ocurrió un error desconocido" };
  }
};
export { logging };
