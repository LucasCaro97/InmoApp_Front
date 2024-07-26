import { useState } from "react";

const NewPropertyForm = (): JSX.Element => {
  const initialState: Propery = {
    nombre: "",
    direccion: "",
    provincia: "",
    ciudad: "",
    descripcion: "",
    tipoOperacion: "Venta",
    categoria: "",
    servicios: "",
    caracteristicas: "",
    ambientes: "",
    precio: 0,
    listaImagenes: [""],
    esAlquiler: false,
    esVenta: false,
  };
  const [propiedad, setPropiedad] = useState<Propery>(initialState);
  return (
    <>
      <h1>NEW FORM</h1>
      <form>
        <label htmlFor="">Nombre inmueble:</label>
        <input type="text" />
        <label htmlFor="">Dirección:</label>
        <input type="text" />
        <label htmlFor="">Ciudad:</label>
        <input type="text" />
        <label htmlFor="">Provincia:</label>
        <input type="text" />
        <label htmlFor="">Descripción:</label>
        <input type="text" />
        <label htmlFor="">Categoria:</label>
        <input type="text" />
        <label htmlFor="">Características:</label>
        <select>
          <option value="">2 pisos</option>
          <option value="">Piscina</option>
          <option value="">Planta alta</option>
        </select>
        <label htmlFor="">Servicios:</label>
        <select>
          <option value="">2 pisos</option>
          <option value="">Piscina</option>
          <option value="">Planta alta</option>
        </select>
        <label htmlFor="">Ambientes:</label>
        <select>
          <option value="">2 pisos</option>
          <option value="">Piscina</option>
          <option value="">Planta alta</option>
        </select>
        <label htmlFor="">Subir imágenes</label>
        <input type="file" id="imageFile" accept="image/*" multiple />
        </form>
    </>
  );
};

export { NewPropertyForm };
