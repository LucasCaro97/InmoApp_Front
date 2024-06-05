import React from 'react'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";

const ImageProductContainer = (props) => {
    
    const { listaImagenes } = props;

    const images = listaImagenes.length > 0 ? 
  listaImagenes.map((imageName, index) => ({
    original: "http://localhost:8080/images/" + imageName,
    thumbnail: "http://localhost:8080/images/" + imageName,
    thumbnailHeight: 200
  })) 
  : 
  [
    {
      original: "/landingimg.png",
      thumbnail: "/landingimg.png",
      thumbnailHeight: 200
    }
  ];

    
  
    return (
    <div className='gallery w-3/4 m-auto flex items-center justify-center'>
        <ImageGallery 
        slideInterval={2000}
        slideDuration={1000}
        showPlayButton={false}
        showBullets={true}
        items={images}
        showFullscreenButton={true}
        thumbnailPosition="left" />
    </div>
  )
}

export default ImageProductContainer
