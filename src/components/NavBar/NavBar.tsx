import { logout } from "../../utils/auth/logout";
import { isAuthenticated } from "../../utils/auth/auth";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import styles from "./navbar.module.css";

// Componente Navbar:
// Continene los links a Inicio y Acerca de, así como dropdowns de Alquiler, Venta y Parámetros.
// Utiliza un event listener y un estado local para manejar el menú móvil

const NavBar = (): JSX.Element => {
  const screenBreakPoint = 767;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(
    window.innerWidth > screenBreakPoint
  );
  const isAuth = isAuthenticated();
  const [optionTitles, setOptionTitles] = useState({
    inmueble: "",
    clientes: "",
    parametros: "",
    gestion: "",
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

        <li>
          <select
            id="inmueble-select"
            name="inmueble"
            onChange={handleSelectChange}
            value={optionTitles.inmueble}
          >
            <option value="" disabled>
              Inmuebles
            </option>
            <option value="alquiler">Alquiler</option>
            <option value="venta">Venta</option>
            {isAuth ? <option value="nuevo-inmueble">Nuevo</option> : null}
          </select>
        </li>
        {isAuth ? (
          <>
            <li>
              <select
                id="clientes-select"
                name="clientes"
                onChange={handleSelectChange}
                value={optionTitles.clientes}
              >
                <option value="" disabled>
                  Clientes
                </option>
                <option value="propietario">Propietarios</option>
                <option value="inquilino">Inquilinos</option>
              </select>
            </li>
            <li>
              <select
                id="parametros-select"
                name="parametros"
                onChange={handleSelectChange}
                value={optionTitles.parametros}
              >
                <option value="" disabled>
                  Parámetros
                </option>
                <option value="nuevoCaracteristica">Caracteristicas</option>
                <option value="nuevoServicio">Servicios</option>
                <option value="nuevoAmbiente">Ambientes</option>
                <option value="nuevoCategoria">Categorias</option>
              </select>
            </li>
            <li>
              <select
                id="gestion-select"
                name="gestion"
                value={optionTitles.gestion}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Gestión
                </option>
                <option value="contratos">Contratos</option>
                <option value="reporte">Reporte</option>
              </select>
            </li>
          </>
        ) : null}
      </ul>
      {isAuth ? (
        <button
          className="mr-10 h-8 w-32 bg-teal-600 text-white rounded-lg text-base shadow-md hover:bg-teal-500 transition-all duration-300 ease-in-out"
          onClick={handleLogOut}
        >
          Cerrar Sesión
        </button>
      ) : (
        <button
          className="mr-10 h-8 w-32 bg-teal-600 text-white rounded-lg text-base shadow-md hover:bg-teal-500 transition-all duration-300 ease-in-out"
          onClick={handleLogin}
        >
          Iniciar Sesión
        </button>
      )}
    </nav>
  );
};

export { NavBar };
