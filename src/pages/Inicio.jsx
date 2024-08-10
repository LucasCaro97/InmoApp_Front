import React, { useEffect, useState } from "react";
import ProductCarrousel from "../components/ProductCarrousel/ProductCarrousel";
import Label1 from "../components/Label1";
import { getProperties } from "../utils/properties/getProperties";
import { toast } from "react-toastify";
const Inicio = () => {
  const [inmuebles, setInmuebles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProperties();
      if (response.ok) {
        setInmuebles(response.data);
      } else {
        toast.error(response.message);
      }
    };
    fetchData();
  }, []);

  // Filtrar inmuebles una vez y almacenarlos en estados separados
  const inmueblesAlquiler = inmuebles.filter((inmueble) => inmueble.esAlquiler);
  const inmueblesVenta = inmuebles.filter((inmueble) => inmueble.esVenta);

  return (
    <div>
      <section className="flex justify-center">
        <img
          className="h-full w-11/12"
          src="/landingimg.png"
          alt="Landing Page Img"
        />
      </section>

      <section className="font-montserra mb-16">
        <Label1 className="text-center">Alquiler de Inmuebles</Label1>
        <ProductCarrousel datos={inmueblesAlquiler} />
      </section>

      <section className="font-montserra mb-16">
        <Label1 className="text-center">Venta de Inmuebles</Label1>
        <ProductCarrousel datos={inmueblesVenta} />
      </section>
    </div>
  );
};

export default Inicio;
