import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

type Props = {
  listaImagenes: Array<string>;
};

const ImageProductContainer = (props: Props) => {
  const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;
  const { listaImagenes } = props;

  const images =
    listaImagenes.length > 0
      ? listaImagenes.map((imageName) => ({
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
    <div className="relative w-full max-w-5xl mx-auto my-6">
      <div className="gallery relative z-10 mx-auto">
        <ImageGallery
          slideInterval={2000}
          slideDuration={1000}
          showPlayButton={false}
          showBullets={true}
          items={images}
          showFullscreenButton={true}
          thumbnailPosition="bottom"
          additionalClass="relative z-10"
        />
      </div>
    </div>
  );
};

export default ImageProductContainer;
