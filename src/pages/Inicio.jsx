import React from 'react'
import ProductCarrousel from '../components/ProductCarrousel'

const Inicio = () => {
  const products = [
    // Array de objetos de productos con title, description, e imageUrl
    { title: 'Producto 1', description: 'Descripción del Producto 1', imageUrl: '/landingimg.png' },
    { title: 'Producto 2', description: 'Descripción del Producto 2', imageUrl: '/landingimg.png' },
    // Agrega más productos según sea necesario
  ];
  
  
  return (
    <div>
      <section>
      <img className='h-full w-full' src="/landingimg.png" alt="Landing Page Img" />
      </section>

      <section className='font-montserra mb-16'>
        <h1 className='font-semibold text-3xl text-green-900 text-center p-5'>Alquiler de Casas y Deptos</h1>
        <ProductCarrousel/>
      </section>

      
      <section className='font-montserra mb-16'>
        <h1 className='font-semibold text-3xl text-green-900 text-center p-5'>Alquiler Local Comercial</h1>
        <ProductCarrousel/>
      </section>

      <section className='font-montserra mb-16'>
        <h1 className='font-semibold text-3xl text-green-900 text-center p-5'>Compra de Lotes</h1>
        <ProductCarrousel/>
      </section>

      
      <section className='font-montserra mb-16'>
        <h1 className='font-semibold text-3xl text-green-900 text-center p-5'>Compra de Terrenos</h1>
        <ProductCarrousel/>
      </section>
    </div>
  )
}

export default Inicio