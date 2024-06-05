  import React, { useState, useEffect } from 'react'
  import Card from './Card'
  import Slider from 'react-slick'
  import "slick-carousel/slick/slick.css"; 
  import "slick-carousel/slick/slick-theme.css";
  import '../App.css'

  const ProductCarrousel = ( {datos} ) => {
    
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 999);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: isSmallScreen ? 1 : 4,
      slidesToScroll: isSmallScreen ? 1 : 3
    };
    
    
    return (
      <div className='w-4/5 m-auto'>
        <div className='mt-5'>
          {datos.length === 0 ? (
            <div>No existen inmuebles cargados</div>
          ) : (
            <Slider {...settings}>
              {datos.map((p, index) => (
                <Card
                  key={p.id}
                  title={p.nombre}
                  description={p.descripcion}
                  id={p.id}
                  imageUrl={p.listaImagenes[0]}
                  className='h-[450px] p-4'
                />
              ))}
            </Slider>
          )}
        </div>
      </div>
    );
  };
  
  export default ProductCarrousel;