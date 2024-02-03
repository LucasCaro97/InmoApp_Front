import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DropdownIcon from './../icons/DropdownIcon';

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isDropdownVentaOpen, setDropdownVentaOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen)    
    }

    const toggleDropdownVenta = () => {
        setDropdownVentaOpen(!isDropdownVentaOpen)        
    }
    
    return (
        <nav className='h-16 flex items-center font-montserrat font-semibold text-xl text-green-900'>
            <ul className='flex mx-10 p-20 gap-20 w-full'>
                <li className='w-[10%]'><Link to='/'>Inicio</Link></li>
                <li className='w-[10%]'><Link to='/sobre-nosotros'>Acerca De</Link></li>

                <li className='relative group w-[10%]' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    <button className='flex items-center' type='button' >
                        <Link to="/alquiler">Alquiler</Link>
                        <DropdownIcon/>
                        </button>

                    {isDropdownOpen && ( 
                        <ul className='absolute text-green-900 text-base py-2 space-y-2 p-2'>
                            <li>Casas y Deptos</li>
                            <li>Local Comercial</li>
                        </ul>
                    )}
                </li>

                <li className='relative group w-[10%]' onMouseEnter={toggleDropdownVenta} onMouseLeave={toggleDropdownVenta}>
                    <button className='flex items-center' type='button'>
                        <Link to="/venta">Venta</Link> 
                        <DropdownIcon/>
                        </button>

                    {isDropdownVentaOpen && ( 
                        <ul className='absolute bg-slate-100 text-green-900 text-base py-2 space-y-2 p-2'>
                            <li>Casas y Deptos</li>
                            <li>Local Comercial</li>
                            <li>Terrenos</li>
                            <li>Lotes</li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
      )
}

export default Navbar
