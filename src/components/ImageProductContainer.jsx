import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageProductContainer = (props) => {
  const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

  const { listaImagenes } = props;

  const images =
    listaImagenes.length > 0
      ? listaImagenes.map((imageName, index) => ({
          original: `${BASE_URL_API}/images/` + imageName,
          thumbnail: `${BASE_URL_API}/images/` + imageName,
          thumbnailHeight: 200,
        }))
      : [
          {
            original: "/landingimg.png",
            thumbnail: "/landingimg.png",
            thumbnailHeight: 200,
          },
        ];

  return (
    <div className="gallery w-3/4 m-auto flex items-center justify-center">
      <ImageGallery
        slideInterval={2000}
        slideDuration={1000}
        showPlayButton={false}
        showBullets={true}
        items={images}
        showFullscreenButton={true}
        thumbnailPosition="left"
      />
    </div>
  );
};

export default ImageProductContainer;
