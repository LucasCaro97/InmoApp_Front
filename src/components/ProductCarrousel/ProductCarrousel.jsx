import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

const ProductCarrousel = ({ datos }) => {
  const [slidesToShow, setSlidesToShow] = useState(datos.length);
  const screenBreakPoints = {
    small: 500,
    medium: 1023,
  };

  const handleSlidesToShow = () => {
    if (window.innerWidth <= screenBreakPoints.small) {
      setSlidesToShow(1);
    } else if (window.innerWidth <= screenBreakPoints.medium) {
      datos.length >= 2 ? setSlidesToShow(2) : setSlidesToShow(datos.length);
    } else {
      setSlidesToShow(4);
    }
  };
  window.addEventListener("resize", handleSlidesToShow);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  useEffect(() => {
    handleSlidesToShow();
  }, [datos]);

  return (
    <div className="w-4/5 m-auto mt-5">
      {datos.length === 0 ? (
        <div>No existen inmuebles cargados</div>
      ) : (
        <div>
          <Slider {...settings}>
            {datos.map((p, index) => (
              <Card
                key={p.id}
                id={p.id}
                title={p.nombre}
                imageUrl={p.listaImagenes[0]}
                description={p.descripcion}
              />
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default ProductCarrousel;
