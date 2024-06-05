import React from 'react'
import Label1 from '../components/Label1'
import Equipo from '../components/Equipo'

const Inicio = () => {
  return (
    <div className='w-4/5 m-auto mb-10'>
      <Label1 className='text-left'>Sobre Nosotros</Label1>
      <div className='px-5'>
      Somos una empresa inmobiliaria dedicada a hacer realidad los sueños de nuestros clientes. Con una vasta experiencia en el mercado y un equipo comprometido, nos esforzamos por ofrecer un servicio excepcional en cada etapa de su viaje en bienes raíces.
      </div>

      <div>
        <Label1 className='text-left'>Nuestra Historia</Label1>
        <div className='px-5'>
        Desde nuestros humildes comienzos, hemos crecido hasta convertirnos en una fuerza líder en el mercado inmobiliario local. Nuestra historia está marcada por una pasión compartida por conectar a las personas con los lugares que aman y las propiedades que sueñan.
        </div>
      </div>

      <div>
        <Label1 className='text-left'>Nuestro Equipo</Label1>
        <div className='px-5'>
        Detrás de cada transacción exitosa hay un equipo dedicado de profesionales. En [Nombre de la Empresa], nuestro equipo está formado por agentes experimentados, asesores financieros y expertos en marketing, todos comprometidos con su éxito.</div>
      </div>
      <Equipo />
    </div>
  )
}

export default Inicio