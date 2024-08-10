import { deleteToken, getToken } from "./localStorage";

const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Date.now() / 1000;

  if (payload.exp < currentTime) {
    deleteToken();
    return false;
  }

  return true;
};
export { isAuthenticated };
