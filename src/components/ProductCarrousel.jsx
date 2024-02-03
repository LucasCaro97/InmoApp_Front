import React from 'react'
import Card from './Card'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../App.css'

const ProductCarrousel = () => {
  const data =[
    {
        title: 'Casa en barrio San Francisco',
        description: 'Casa con 3 dormitorios, garage, patio.',
        imageUrl: '/landingImg.png'
    },
    {
        title: 'Casa en barrio San Francisco',
        description: 'Casa con 3 dormitorios, garage, patio.',
        imageUrl: '/landingImg.png'
    },
    {
        title: 'Casa en barrio San Francisco',
        description: 'Casa con 3 dormitorios, garage, patio.',
        imageUrl: '/landingimg.png'
    },
    {
        title: 'Casa en barrio San Francisco',
        description: 'Casa con 3 dormitorios, garage, patio.',
        imageUrl: '/landingimg.png'
    },
    {
        title: 'Casa en barrio San Francisco',
        description: 'Casa con 3 dormitorios, garage, patio.',
        imageUrl: '/landingimg.png'
    },
    {
        title: 'Card 6',
        description: 'Casa con 3 dormitorios, garage, patio.',
        imageUrl: '/landingimg.png'
    }

  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3
  };
  
  
  
    return (
    <div className='w-4/5 m-auto'>
      <div className='mt-5'>
        <Slider {...settings}>
        {data.map((p, index) => (
            <div key={index} className='h-[450px] p-4'>
              <div className='h-full rounded-xl bg-custom-green border-2 border-lime-700 flex-col justify-center items-center'>
                
              <div className='flex justify-center items-center p-4'>
              <p className='text-xl font-semibold'>{p.title}</p>
              </div>  

              <div className='flex h-1/2 justify-center items-center'>
                <img src="/landingimg.png" alt="" />
              </div>

              
            <div className='flex flex-col justify-center items-center gap-4 p-4'>
                <p>{p.description}</p>
                <button className='bg-green-900 text-slate-300 text-lg px-6 py-1 rounded-xl'>Ver mas</button>
            </div>

              </div>

              

        </div>
        ))}
        </Slider>
      </div>
    </div>
  )
}

export default ProductCarrousel
