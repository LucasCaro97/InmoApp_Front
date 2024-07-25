import { ChangeEvent, useEffect, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/newAuth";
import { logout } from "../../utils/newLogout";
import styles from "./navbar.module.css";
const NavBarNew = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const isAuth = isAuthenticated();
  const [menuOpen, setMenuOpen] = useState(window.innerWidth > 767);
  const [optionTitles, setOptionTitles] = useState({
    alquiler: "",
    venta: "",
    parametros: "",
  });
  const handleMenuMobile = () => {
    setMenuOpen(!menuOpen);
  };
  const handleNavigate = () => {
    window.innerWidth < 767 && setMenuOpen(false);
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue: string = e.target.value;
    const { name } = e.target;
    if (selectedValue) {
      setOptionTitles({
        ...optionTitles,
        [name]: "",
      });
      handleNavigate();
      navigate(`/${selectedValue}`);
    }
  };
  const handleLogOut = () => {
    logout(navigate);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  window.addEventListener("resize", () => {
    if (menuOpen === false) {
      setMenuOpen(window.innerWidth > 767);
    }
  });

  return (
    <nav className={styles.navbar}>
      <button className="md:hidden ml-4 z-20" onClick={handleMenuMobile}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <ul
        className={styles.navList}
        style={menuOpen ? { display: "flex" } : { display: "none" }}
      >
        <Link to="/" onClick={handleNavigate}>
          <li>Inicio</li>
        </Link>
        <Link to="/sobre-nosotros" onClick={handleNavigate}>
          <li>Acerca de</li>
        </Link>
        <li>
          <select
            id="alquiler-select"
            name="alquiler"
            value={optionTitles.alquiler}
            onChange={handleSelectChange}
          >
            <option value="">Alquiler</option>
            <option value="alquiler">Todos</option>
            <option value="alquilerNuevo">Nuevo</option>
          </select>
        </li>
        <li>
          <select
            id="venta-select"
            name="venta"
            value={optionTitles.venta}
            onChange={handleSelectChange}
          >
            <option value="">Venta</option>
            <option value="venta">Todos</option>
            <option value="ventaNuevo">Nuevo</option>
          </select>
        </li>
        <li>
          <select
            id="parametros-select"
            name="parametros"
            value={optionTitles.parametros}
            onChange={handleSelectChange}
          >
            <option value="">Parametros</option>
            <option value="nuevoCaracteristica">Caracteristicas</option>
            <option value="nuevoServicio">Servicios</option>
            <option value="nuevoAmbiente">Ambientes</option>
            <option value="nuevoCategoria">Categorias</option>
          </select>
        </li>
      </ul>
      {isAuth ? (
        <button
          className="mr-10 h-8 w-32 bg-green-700 text-white rounded-xl text-base"
          onClick={handleLogOut}
        >
          Cerrar Sesion
        </button>
      ) : (
        <button
          className="mr-10 h-8 w-32 bg-green-700 text-white rounded-xl text-base"
          onClick={handleLogin}
        >
          Iniciar Sesion
        </button>
      )}
    </nav>
  );
};

export { NavBarNew };
