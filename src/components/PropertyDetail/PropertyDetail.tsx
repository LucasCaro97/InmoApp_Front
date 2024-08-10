import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageProductContainer from "../ImageProductContainer";
import axios from "axios";

const PropertyDetail = () => {
  const { id } = useParams();
  const [inmueble, setInmueble] = useState<Property>();
  const [arrayDeImagenes, setArrayDeImagenes] = useState<Array<string>>([]);

  const handdleRedirect = () => {
    const inmuebleVar = inmueble?.nombre;
    const phoneNumber = "5493751364441";
    const message = encodeURIComponent(
      `Hola, acabo de ver el inmueble ${inmuebleVar} a través de la página web, me gustaría más información del mismo`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL_API}/inmueble/${id}`);
        setInmueble(response.data);
        setArrayDeImagenes(response.data.listaImagenes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <ImageProductContainer listaImagenes={arrayDeImagenes} />

      <div className="mt-6">
        <div className="flex flex-col lg:flex-row justify-between items-center bg-white shadow-md rounded-lg p-6">
          <div className="text-xl font-bold text-green-900">
            {inmueble?.nombre}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
            {inmueble?.esAlquiler && (
              <p className="text-lg text-green-700">
                Precio de alquiler: ${inmueble?.precioAlquiler} mensuales.
              </p>
            )}
            {inmueble?.esVenta && (
              <p className="text-lg text-green-700">
                Precio de venta: ${inmueble?.precioVenta}.
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 bg-custom-green text-green-900 border border-lime-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Descripción</h2>
          <p>{inmueble?.descripcion}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-custom-green border border-lime-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Características</h3>
          <ul className="list-disc list-inside text-green-900">
            {inmueble?.caracteristicas?.map((c) => (
              <li key={c.nombre + c.id}>{c.nombre}</li>
            ))}
          </ul>
        </div>

        <div className="bg-custom-green border border-lime-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Servicios</h3>
          <ul className="list-disc list-inside text-green-900">
            {inmueble?.servicios?.map((item) => (
              <li key={item.id}>{item.nombre}</li>
            ))}
          </ul>
        </div>

        <div className="bg-custom-green border border-lime-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Ambientes</h3>
          <ul className="list-disc list-inside text-green-900">
            {inmueble?.ambientes?.map((item) => (
              <li key={item.id}>{item.nombre}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          className="bg-green-900 text-white text-lg px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
          onClick={handdleRedirect}
        >
          Contactar
        </button>
      </div>
    </div>
  );
};

export { PropertyDetail };
