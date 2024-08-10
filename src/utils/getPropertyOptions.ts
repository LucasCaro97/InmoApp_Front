import axios from "axios";
import { getToken } from "./auth/localStorage";
const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;
const token = getToken();
const listaCaract = async () => {
  const response = await axios.get(`${BASE_URL_API}/caracteristicas`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data;
  }
};

const listaServ = async () => {
  const response = await axios.get(`${BASE_URL_API}/servicios`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data;
  }
};
const listaAmb = async () => {
  const response = await axios.get(`${BASE_URL_API}/ambientes`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data;
  }
};
const listaCat = async () => {
  const response = await axios.get(`${BASE_URL_API}/categoria`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data;
  }
};
const listaDeEstados = async () => {
  const response = await axios.get(`${BASE_URL_API}/estadoinmueble`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data;
  }
};
const listaPropietarios = async () => {
  const response = await axios.get(`${BASE_URL_API}/propietario`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data;
  }
};

export {
  listaCaract,
  listaServ,
  listaAmb,
  listaCat,
  listaDeEstados,
  listaPropietarios,
};
