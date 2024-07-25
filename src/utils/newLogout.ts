import { NavigateFunction } from "react-router-dom";
const logout = (navigate: NavigateFunction) => {
  localStorage.removeItem("jwt");
  navigate("/login");
};

export { logout };
