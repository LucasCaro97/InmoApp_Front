import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DropdownIcon from './../icons/DropdownIcon';
import LinkCustomized from './LinkCustomized';
import { isAuthenticated } from '../utils/auth';
import { logout } from '../utils/logout';

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isDropdownVentaOpen, setDropdownVentaOpen] = useState(false);
    const [isDropdownParametrosOpen, setDropdownParametrosOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const toggleDropdownVenta = () => {
        setDropdownVentaOpen(!isDropdownVentaOpen);
    };

    const toggleDropdownParametros = () => {
        setDropdownParametrosOpen(!isDropdownParametrosOpen);
    };

    const toggleMenu = (event) => {
        event.stopPropagation();  // Detener la propagación del evento
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.menu-container') && menuOpen) {
            setMenuOpen(false);
        }
    };

    const handleLinkClick = () => {
        console.log("Accedi")
        setMenuOpen(false);
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <nav className='w-11/12 m-auto h-16 flex items-center justify-between font-montserrat font-semibold text-xl text-green-900'>
            {/* Botón de hamburguesa para dispositivos móviles */}
            <button 
                className='md:hidden ml-4 z-20'
                onClick={toggleMenu}
            >
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
                </svg>
            </button>
            {/* Menú para dispositivos móviles */}
            {menuOpen && (
                <div className='menu-container md:hidden absolute inset-x-0 top-16 bg-gray-100 shadow-lg text-base z-10'>
                    <ul className='flex flex-col items-start ml-20 gap-1 mb-2 divide-y-2 divide-green-700'>
                        <li><Link to='/' className='w-[120px]' onClick={handleLinkClick}>Inicio</Link></li>
                        <li><Link to='/sobre-nosotros' className='w-[120px]' onClick={handleLinkClick}>Acerca De</Link></li>
                        <li className='relative group w-[120px]' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                            <button className='flex items-center' type='button'>
                                <Link>Alquiler</Link>
                                <DropdownIcon/>
                            </button>
                            {isDropdownOpen && ( 
                                <ul className='absolute bg-slate-100 text-green-900 text-base py-2 space-y-2 p-2 left-full top-0 divide-y divide-green-700'>
                                    <LinkCustomized to="/alquiler" onClick={handleLinkClick}>Ver Todos</LinkCustomized>
                                    {isAuthenticated() && (<LinkCustomized to="/alquilerNuevo" onClick={handleLinkClick}>Nuevo Inmueble</LinkCustomized>)}
                                </ul>
                            )}
                        </li>
                        <li className='relative group w-[120px]' onMouseEnter={toggleDropdownVenta} onMouseLeave={toggleDropdownVenta}>
                            <button className='flex items-center' type='button'>
                                <Link>Venta</Link>
                                <DropdownIcon/>
                            </button>
                            {isDropdownVentaOpen && ( 
                                <ul className='absolute bg-slate-100 text-green-900 text-base py-2 space-y-2 p-2 left-full top-0 divide-y divide-green-700'>
                                    <LinkCustomized to="/venta" onClick={handleLinkClick}>Ver Todos</LinkCustomized>
                                    {isAuthenticated() && (<LinkCustomized to="/ventaNuevo" onClick={handleLinkClick}>Nuevo Inmueble</LinkCustomized>)}
                                </ul>
                            )}
                        </li>
                        {isAuthenticated() && (
                            <li className='relative group w-[120px]' onMouseEnter={toggleDropdownParametros} onMouseLeave={toggleDropdownParametros}>
                            <button className='flex items-center' type='button'>
                                <Link to="/venta" onClick={handleLinkClick}>Parametros</Link> 
                                <DropdownIcon/>
                                </button>
        
                            {isDropdownParametrosOpen && ( 
                                <ul className='absolute bg-slate-100 text-green-900 text-base py-2 space-y-2 p-2 divide-y-2 divide-green-700'>
                                    <LinkCustomized to="/nuevoCaracteristica" onClick={handleLinkClick}>Caracteristicas</LinkCustomized>
                                    <LinkCustomized to="/nuevoServicio" onClick={handleLinkClick}>Servicios</LinkCustomized>
                                    <LinkCustomized to="/nuevoAmbiente" onClick={handleLinkClick}>Ambientes</LinkCustomized>
                                    <LinkCustomized to="/nuevoCategoria" onClick={handleLinkClick}>Categorias</LinkCustomized>
                                </ul>
                            )}
                                </li>
                        )}
                    </ul>
                    {isAuthenticated() ? (
                        <button className='ml-20 mb-2 h-8 w-32 bg-green-700 text-white rounded-xl text-base' onClick={handleLogout}>Cerrar Sesion</button>
                    ) : (
                        <button className='hidden mr-10 h-8 w-32 bg-green-700 text-white rounded-xl text-base'>Iniciar Sesion</button>
                    )}
                </div>
            )}

            {/* Menú para pantallas grandes */}
            <ul className='hidden md:flex justify-between mx-10 px-20 gap-20 w-2/3 z-10'>
                <li className='w-[10%]'><Link to='/' onClick={handleLinkClick}>Inicio</Link></li>
                <li className='w-[10%]'><Link to='/sobre-nosotros' onClick={handleLinkClick}>Acerca De</Link></li>
                <li className='relative group w-[10%]' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    <button className='flex items-center' type='button'>
                        <Link to="/alquiler" onClick={handleLinkClick}>Alquiler</Link>
                        <DropdownIcon/>
                    </button>
                    {isDropdownOpen && ( 
                        <ul className='absolute bg-slate-100 text-green-900 text-base py-2 space-y-2 p-2 divide-y-2 divide-green-700'>
                            <LinkCustomized to="/alquiler" onClick={handleLinkClick}>Ver Todos</LinkCustomized>
                            {isAuthenticated() && (<LinkCustomized to="/alquilerNuevo" onClick={handleLinkClick}>Nuevo Inmueble</LinkCustomized>)}
                        </ul>
                    )}
                </li>
                <li className='relative group w-[10%]' onMouseEnter={toggleDropdownVenta} onMouseLeave={toggleDropdownVenta}>
                    <button className='flex items-center' type='button'>
                        <Link to="/venta" onClick={handleLinkClick}>Venta</Link> 
                        <DropdownIcon/>
                    </button>
                    {isDropdownVentaOpen && ( 
                        <ul className='absolute bg-slate-100 text-green-900 text-base py-2 space-y-2 p-2 divide-y-2 divide-green-700'>
                            <LinkCustomized to="/venta" onClick={handleLinkClick}>Ver Todos</LinkCustomized>
                            {isAuthenticated() && (<LinkCustomized to="/ventaNuevo" onClick={handleLinkClick}>Nuevo Inmueble</LinkCustomized>)}
                        </ul>
                    )}
                </li>
                {isAuthenticated() && (
                    <li className='relative group w-[10%]' onMouseEnter={toggleDropdownParametros} onMouseLeave={toggleDropdownParametros}>
                    <button className='flex items-center' type='button'>
                        <Link to="/venta" onClick={handleLinkClick}>Parametros</Link> 
                        <DropdownIcon/>
                    </button>
                    {isDropdownParametrosOpen && ( 
                        <ul className='absolute bg-slate-100 text-green-900 text-base py-2 space-y-2 p-2 divide-y-2 divide-green-700'>
                            <LinkCustomized to="/nuevoCaracteristica" onClick={handleLinkClick}>Caracteristicas</LinkCustomized>
                            <LinkCustomized to="/nuevoServicio" onClick={handleLinkClick}>Servicios</LinkCustomized>
                            <LinkCustomized to="/nuevoAmbiente" onClick={handleLinkClick}>Ambientes</LinkCustomized>
                            <LinkCustomized to="/nuevoCategoria" onClick={handleLinkClick}>Categorias</LinkCustomized>
                        </ul>
                    )}
                </li>
                )}
            </ul>
            {isAuthenticated() ? (
                <button className='mr-10 h-8 w-32 bg-green-700 text-white rounded-xl text-base' onClick={handleLogout}>Cerrar Sesion</button>
            ) : (
                <button className='hidden mr-10 h-8 w-32 bg-green-700 text-white rounded-xl text-base'>Iniciar Sesion</button>
            )}
        </nav>
    );
};

export default Navbar;
