import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth/auth";
import { logout } from "../../utils/auth/logout";
import styles from "./navbar.module.css";

// Componente Navbar:
// Continene los links a Inicio y Acerca de, así como dropdowns de Alquiler, Venta y Parámetros.
// Utiliza un event listener y un estado local para manejar el menú móvil

const NavBarNew = (): JSX.Element => {
  const screenBreakPoint = 767;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(
    window.innerWidth > screenBreakPoint
  );
  const isAuth = isAuthenticated();
  const [optionTitles, setOptionTitles] = useState({
    alquiler: "",
    venta: "",
    altas: "",
  });

  //La ventana escucha un evento Resize para cambiar entre menu movil y menu de escritorio.

  window.addEventListener("resize", () => {
    if (menuOpen === false) {
      setMenuOpen(window.innerWidth > screenBreakPoint);
    }
  });
  const handleMenuMobile = () => {
    setMenuOpen(!menuOpen);
  };
  // En caso de utilizar el menu movil el menu debe cerrarse al hacer click.
  const handleNavigate = () => {
    window.innerWidth < screenBreakPoint && setMenuOpen(false);
  };
  //Utiliza en valor de los options del select para navegar a la vista correspondiente.
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
  //Inicio y cierre de sesión
  const handleLogOut = () => {
    logout(navigate);
  };
  const handleLogin = () => {
    navigate("/login");
  };

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
        {isAuth ? (
          <>
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
                id="altas-select"
                name="altas"
                value={optionTitles.altas}
                onChange={handleSelectChange}
              >
                <option value="">Altas</option>
                <option value="propietario">Propietario</option>
                <option value="inquilino">Inquilino</option>
                <option value="nuevoCaracteristica">Caracteristicas</option>
                <option value="nuevoServicio">Servicios</option>
                <option value="nuevoAmbiente">Ambientes</option>
                <option value="nuevoCategoria">Categorias</option>
              </select>
            </li>
            <li></li>
          </>
        ) : null}
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
