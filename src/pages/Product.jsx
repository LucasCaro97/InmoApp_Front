import React from 'react'
import Label1 from '../components/Label1'
import ImageProductContainer from '../components/ImageProductContainer'

const Product = () => {
    const data = {
        id:1,
        title: "Casa barrio San Francisco",
        description: "3 habitaciones, garage, patio"
    }  
  
    return (
    <div>
      <div>
      <section className='w-3/4 m-auto'>
      <Label1 className='text-left'>{data.title}</Label1>
      <ImageProductContainer/>
      
      </section>
      </div>
    </div>
  )
}

export default Product
