import { NavigateFunction } from "react-router-dom";
import { deleteToken } from "./localStorage";
const logout = (navigate: NavigateFunction) => {
  deleteToken();
  navigate("/login");
};

export { logout };
