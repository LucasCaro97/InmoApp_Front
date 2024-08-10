import React, { useEffect, useState } from "react";
import Label1 from "../../components/Label1";
import {
  listaCaract,
  listaServ,
  listaAmb,
  listaCat,
  listaDeEstados,
  listaPropietarios,
} from "../../utils/getPropertyOptions";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "./styles.css";
const CargaDeInmuebles = () => {
  const { id } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [listaDeCaracteristicas, setListaDeCaracteristicas] = useState([]);
  const [listaDeServicios, setListaDeServicios] = useState([]);
  const [listaDeAmbientes, setListaDeAmbientes] = useState([]);
  const [listaDeCategorias, setListaDeCategorias] = useState([]);
  const [listaDePropietarios, setListaDePropietarios] = useState([]);
  const [listaEstados, setListaDeEstados] = useState([]);

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [ambientes, setAmbientes] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [imagenesNew, setImagenesNew] = useState([]);
  const [esAlquiler, setEsAlquiler] = useState(false);
  const [esVenta, setEsVenta] = useState(false);
  const [precioAlquiler, setPrecioAlquiler] = useState(0);
  const [precioVenta, setPrecioVenta] = useState(0);
  const [propietario, setPropietario] = useState(0);
  const [estadoInmueble, setEstadoInmueble] = useState(0);
  const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;
  const fetchData = async () => {
    const token = localStorage.getItem("jwt");

    if (token) {
      try {
        if (id) {
          const inmuebleResponse = await axios.get(
            `${BASE_URL_API}/inmueble/${id}`
          );
          const inmuebleData = inmuebleResponse.data;
          setPropietario(inmuebleData?.propietario.id);
          setNombre(inmuebleData.nombre);
          setDireccion(inmuebleData.direccion);
          setCiudad(inmuebleData.ciudad);
          setProvincia(inmuebleData.provincia);
          setDescripcion(inmuebleData.descripcion);
          setCategoria(inmuebleData.categoria.id);
          setCaracteristicas(inmuebleData.caracteristicas?.map((c) => c.id));
          setServicios(inmuebleData.servicios?.map((s) => s.id));
          setAmbientes(inmuebleData.ambientes?.map((a) => a.id));
          setEsAlquiler(inmuebleData.esAlquiler);
          setEsVenta(inmuebleData.esVenta);
          setPrecioAlquiler(inmuebleData.precioAlquiler);
          setPrecioVenta(inmuebleData.precioVenta);
          setEstadoInmueble(inmuebleData.estadoInmueble.id);
          setImagenes(inmuebleData.listaImagenes);

          setEditMode(true);
        }
        const listaCaracteristicas = await listaCaract();
        const listaServicios = await listaServ();
        const listaAmbientes = await listaAmb();
        const listaCategorias = await listaCat();
        const listaEstadosInm = await listaDeEstados();
        const lista_propietarios = await listaPropietarios();

        setListaDeCaracteristicas(listaCaracteristicas);
        setListaDeServicios(listaServicios);
        setListaDeAmbientes(listaAmbientes);
        setListaDeCategorias(listaCategorias);
        setListaDePropietarios(lista_propietarios);
        setListaDeEstados(listaEstadosInm);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleNameChange = (event) => {
    setNombre(event.target.value);
  };

  const handleDireccionChange = (event) => {
    setDireccion(event.target.value);
  };

  const handleCiudadChange = (event) => {
    setCiudad(event.target.value);
  };

  const handleProvinciaChange = (event) => {
    setProvincia(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleCaracteristicasChange = (id) => {
    setCaracteristicas((prevCaracteristicas) =>
      prevCaracteristicas.includes(id)
        ? prevCaracteristicas.filter(
            (caracteristicaId) => caracteristicaId !== id
          )
        : [...prevCaracteristicas, id]
    );
  };

  const handleServiciosChange = (id) => {
    setServicios((prevServicios) =>
      prevServicios.includes(id)
        ? prevServicios.filter((servicioId) => servicioId !== id)
        : [...prevServicios, id]
    );
  };

  const handleAmbientesChange = (id) => {
    setAmbientes((prevAmbientes) =>
      prevAmbientes.includes(id)
        ? prevAmbientes.filter((ambienteId) => ambienteId !== id)
        : [...prevAmbientes, id]
    );
  };
  const handleEstadoInmueble = (e) => {
    const { value } = e.target;
    setEstadoInmueble(Number(value));
  };
  const hanldePriceChange = (e) => {
    const { name, value } = e.target;
    const price = Number(value);
    name === "precioAlquiler"
      ? setPrecioAlquiler(price)
      : setPrecioVenta(price);
  };
  const handlePropietario = (e) => {
    const { value } = e.currentTarget;
    const id = Number(value);
    setPropietario(id);
  };

  const handleImagenesChange = (event) => {
    const archivos = event.target.files;
    const imagenesArray = Array.from(archivos);
    setImagenesNew(imagenesArray);
  };

  const eliminarImagen = (nameImage) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        axios
          .delete(`${BASE_URL_API}/inmueble/${id}/deleteImage/${nameImage}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              toast.success("Imagen eliminada correctamente");
              setImagenes((prevImagenes) =>
                prevImagenes.filter((item) => item !== nameImage)
              );
            }
          });
      } catch (error) {
        toast.error("Error al realizar la solicitud DELETE" + error);
      }
    }
  };

  const handleNewProduct = async (event) => {
    event.preventDefault();

    if (caracteristicas.length === 0) {
      toast.error("Por favor, selecciona al menos una característica.");
      return;
    }
    if (servicios.length === 0) {
      toast.error("Por favor, selecciona al menos un servicio.");
      return;
    }
    if (ambientes.length === 0) {
      toast.error("Por favor, selecciona al menos un ambiente.");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("direccion", direccion);
    formData.append("ciudad", ciudad);
    formData.append("provincia", provincia);
    formData.append("descripcion", descripcion);
    formData.append("categoria", categoria);
    formData.append("esAlquiler", esAlquiler);
    formData.append("esVenta", esVenta);
    formData.append("precioAlquiler", precioAlquiler);
    formData.append("precioVenta", precioVenta);
    formData.append("propietario", propietario);
    formData.append("estadoInmueble", estadoInmueble);
    caracteristicas.forEach((caracteristica) =>
      formData.append("caracteristicas", caracteristica)
    );
    servicios.forEach((servicio) => formData.append("servicios", servicio));
    ambientes.forEach((ambiente) => formData.append("ambientes", ambiente));
    imagenesNew.forEach((imagen) => formData.append("imagenes", imagen));

    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        let url = `${BASE_URL_API}/inmueble`;
        const method = editMode ? "put" : "post";

        if (editMode) {
          url += `/${id}`;
        }
        const response = await axios({
          method: method,
          url: url,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        const successMessage = editMode
          ? "Inmueble actualizado exitosamente"
          : "Inmueble creado exitosamente";
        const errorMessage = editMode
          ? "Error al actualizar el inmueble"
          : "Error al crear el inmueble";

        if (response.status === 200 || response.status === 201) {
          toast.success(successMessage);
          setImagenes(response.data.listaImagenes);
        } else {
          toast.error(`${errorMessage}: ${response.statusText}`);
        }
      } catch (error) {
        const errorMessage = editMode
          ? "Error al actualizar el inmueble"
          : "Error al crear el inmueble";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div>
      <div className="w-3/4 m-auto 2xl:px-36">
        <Label1>Carga de Inmuebles</Label1>
        <form
          onSubmit={handleNewProduct}
          className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div className="flex flex-col">
            <label
              htmlFor="nombreInmueble"
              className="font-semibold text-base text-green-900"
            >
              Nombre Inmueble
            </label>
            <input
              type="text"
              onChange={handleNameChange}
              value={nombre}
              className="inputText"
              id="nombreInmueble"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="propietario"
              className="font-semibold text-base text-green-900"
            >
              Propietario:
            </label>
            <select
              name="propietario"
              id="propietario"
              value={propietario || ""}
              onChange={handlePropietario}
            >
              <option value="" disabled>
                Seleccione un propietario
              </option>
              {listaDePropietarios.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.nombreCompleto}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="direccion"
              className="font-semibold text-base text-green-900"
            >
              Dirección
            </label>
            <input
              type="text"
              onChange={handleDireccionChange}
              value={direccion}
              className="inputText"
              id="direccion"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="ciudad"
              className="font-semibold text-base text-green-900"
            >
              Ciudad
            </label>
            <input
              type="text"
              onChange={handleCiudadChange}
              value={ciudad}
              className="inputText"
              id="ciudad"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="provincia"
              className="font-semibold text-base text-green-900"
            >
              Provincia
            </label>
            <input
              type="text"
              onChange={handleProvinciaChange}
              value={provincia}
              className="inputText"
              id="provincia"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="descripcion"
              className="font-semibold text-base text-green-900"
            >
              Descripción
            </label>
            <textarea
              onChange={handleDescripcionChange}
              value={descripcion}
              rows="4"
              cols="50"
              className="inputText"
              id="descripcion"
            />
          </div>
          <div className="flex gap-8">
            <div className="w-1/2">
              <label
                htmlFor="categoria"
                className="font-semibold text-base text-green-900"
              >
                Categoría
              </label>
              <select
                onChange={handleCategoriaChange}
                value={categoria}
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 w-full"
              >
                <option value="" disabled>
                  Seleccionar categoría
                </option>
                {listaDeCategorias?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <input
                  type="checkbox"
                  id="miCheckbox"
                  checked={esAlquiler}
                  onChange={() => setEsAlquiler(!esAlquiler)}
                  name="miCheckbox"
                />
                <label htmlFor="miCheckbox"> Alquiler</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="miCheckbox2"
                  checked={esVenta}
                  onChange={() => setEsVenta(!esVenta)}
                  name="miCheckbox2"
                />
                <label htmlFor="miCheckbox2"> Venta</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="caracteristicas"
              className="font-semibold text-base text-green-900"
            >
              Características
            </label>
            <div className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 w-full h-28 overflow-auto">
              {listaDeCaracteristicas?.map((cat) => (
                <label key={cat.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={cat.id}
                    checked={caracteristicas.includes(cat.id)}
                    onChange={() => handleCaracteristicasChange(cat.id)}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span className="text-gray-700">{cat.nombre}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="servicios"
              className="font-semibold text-base text-green-900"
            >
              Servicios
            </label>
            <div className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 w-full h-28 overflow-auto">
              {listaDeServicios?.map((cat) => (
                <label key={cat.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={cat.id}
                    checked={servicios.includes(cat.id)}
                    onChange={() => handleServiciosChange(cat.id)}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span className="text-gray-700">{cat.nombre}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="ambientes"
              className="font-semibold text-base text-green-900"
            >
              Ambientes
            </label>
            <div className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 w-full h-28 overflow-auto">
              {listaDeAmbientes?.map((cat) => (
                <label key={cat.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={cat.id}
                    checked={ambientes.includes(cat.id)}
                    onChange={() => handleAmbientesChange(cat.id)}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span className="text-gray-700">{cat.nombre}</span>
                </label>
              ))}
            </div>
          </div>

          {estadoInmueble ? (
            <div className="flex flex-col">
              <label htmlFor="estadoInmueble">Estado del inmueble:</label>
              <select
                name="estadoInmueble"
                id="estadoInmueble"
                onChange={handleEstadoInmueble}
                value={estadoInmueble}
              >
                {listaEstados.map((e) => (
                  <option key={e.id + e.nombre} value={e.id}>
                    {e.nombre}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div className="flex flex-col">
            <label htmlFor="precioAlquiler">Precio alquiler</label>
            <input
              type="number"
              id="precioAlquiler"
              className="inputText"
              min={0}
              step={0.1}
              value={precioAlquiler}
              name="precioAlquiler"
              onChange={hanldePriceChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="precioVenta">Precio venta</label>
            <input
              type="number"
              id="precioVenta"
              className="inputText"
              min={0}
              step={0.1}
              value={precioVenta}
              name="precioVenta"
              onChange={hanldePriceChange}
            />
          </div>
          <div className="flex flex-col col-span-full gap-2">
            <div className="flex gap-3">
              {imagenes?.map((item) => (
                <div className="relative" key={item}>
                  <img
                    src={`${BASE_URL_API}/images/` + item}
                    className="h-40"
                  />
                  <button
                    type="button"
                    onClick={() => eliminarImagen(item)}
                    className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor="imagenes"
                className="font-semibold text-base text-green-900"
              >
                Subir Imágenes
              </label>
              <input
                type="file"
                id="imagenes"
                name="imagenes"
                onChange={handleImagenesChange}
                multiple
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col sm:col-span-2 lg:col-span-3 items-center mb-4">
            <button
              type="submit"
              className="w-1/2 bg-green-900 text-slate-300 text-lg px-6 py-1 rounded-xl"
            >
              {editMode ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CargaDeInmuebles;