import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-between bg-green-900'>
        <div className=''>
            <img className='w-56 p-5' src="https://cdn.dribbble.com/users/5832433/screenshots/14499634/media/30823d8b7653c7d0e63965ae053dbf60.jpg" alt="Logo inmobiliaria" />
        </div>
        <div className='flex items-center'>
            <ul className='flex-col justify-end font-montserrat font-semibold text-xl text-slate-300'>
                <li className='text-right pr-10'>Contacto</li>
                <li className='text-right pr-10'>inmobiliaria@gmail.com</li>
                <li className='text-right pr-10'>+549 3751 364441</li>
                <li className='text-right pr-10'>Posadas, Misiones, Argentina</li>
            </ul>
        </div>
    </div>
  )
}

export default Footer
