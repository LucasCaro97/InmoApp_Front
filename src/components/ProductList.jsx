import React, { useState, useEffect } from 'react'
import Card from './Card'
import axios from 'axios';

const ProductList = ( {datos} ) => {
    
     
    return (
    <div className='mt-4 grid grid-cols-1 md:grid-cols-4'>
      {datos.map( (p,index) => (
        <div key={index} className='md:w-3/4 mb-8 text-center'>
            <Card 
            title={p.nombre}
            description={p.descripcion}
            id={p.id}
            imageUrl={p.listaImagenes[0]}
            className='h-[450px] 1/4'></Card>
        </div>
        
      ) )}

    </div>
  )
}

export default ProductList
