import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getParams } from "../../utils/params/getParams";
import { MyContext } from "../../store/Provider";
import { ModalConfirm } from "../../components/ModalConfirm/ModalConfirm";
import { deleteParam } from "../../utils/params/deleteParam";
import { updateParam } from "../../utils/params/updateParam";
import { saveNewParam } from "../../utils/params/saveNewParam";
import deleteImage from "../../icons/delete.png";
import editImage from "../../icons/edit.png";
import "./styles.css";
const CargaDeParametrosGenerales = ({ tipoParametro }) => {
  const context = useContext(MyContext);
  const { parameters } = context.state;
  const { saveParameters, filterParameters } = context;
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [paramToEdit, setParamToEdit] = useState({});
  const [newParam, setNewParam] = useState("");
  const [paramToDelete, setParamToDelete] = useState();

  const fetchData = async () => {
    const result = await getParams(tipoParametro);
    saveParameters(result);
  };
  useEffect(() => {
    fetchData();
  }, [newParam, editMode, tipoParametro]);

  useEffect(() => {
    setOpenEditForm(false);
  }, [tipoParametro]);
  const handleEdit = (id) => {
    setOpenEditForm(!openEditForm);
    const param = parameters?.filter((p) => p.id === id);
    setParamToEdit(param[0]);
    !editMode && setEditMode(true);
  };
  const confirmDelete = async () => {
    if (paramToDelete !== undefined) {
      const result = await deleteParam(paramToDelete, tipoParametro);
      if (result.ok) {
        const newList = parameters?.filter((p) => p.id !== paramToDelete);
        saveParameters(newList);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      const result = await updateParam(paramToEdit, tipoParametro);
      if (result.ok) {
        setEditMode(false);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } else {
      const result = await saveNewParam(newParam, tipoParametro);
      if (result.ok) {
        setNewParam("");
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };
  const handleChange = (e) => {
    const { value } = e.target;
    if (editMode) {
      setParamToEdit({ ...paramToEdit, nombre: value });
    } else {
      setNewParam(value);
    }
  };
  const handleSearchInput = (e) => {
    const { value } = e.target;
    if (value.length) {
      filterParameters(value);
    } else {
      fetchData();
    }
  };
  return (
    <>
      <div className="container mx-auto mb-4">
        <h1 className="text-3xl font-bold mb-4">Tabla de {tipoParametro}</h1>
        <button
          className="bg-green-900 text-slate-300 text-lg px-6 py-1 rounded-xl mb-2"
          onClick={() => {
            setOpenEditForm(!openEditForm);
            setEditMode(false);
          }}
        >
          {!openEditForm ? "Nuevo" : "Cerrar"}
        </button>
        {openEditForm && (
          <form className="updateForm" onSubmit={handleSubmit}>
            <label>{!editMode ? "Nuevo" : "Cambiar"} valor:</label>
            <input
              type="text"
              value={editMode ? paramToEdit.nombre : newParam}
              onChange={handleChange}
            />
            <button className="bg-green-900 text-slate-300 text-lg px-6 py-1 rounded-xl mb-2">
              {editMode ? "Actualizar" : "Crear"}
            </button>
          </form>
        )}

        <div>
          <label htmlFor="inputSearch">Buscar:</label>
          <input
            type="text"
            name="inputSearch"
            id="inputSearch"
            onInput={handleSearchInput}
          />
        </div>
        {parameters?.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
              </tr>
            </thead>
            <tbody>
              {parameters?.map((parametro, index) => (
                <tr key={parametro.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {parametro.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {parametro.nombre}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span className="iconsRow">
                      <img
                        src={deleteImage}
                        onClick={() => {
                          setOpenModal(true);
                          setParamToDelete(parametro.id);
                        }}
                      />
                      <img
                        src={editImage}
                        onClick={() => handleEdit(parametro.id)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay datos para mostrar.</p>
        )}
      </div>
      {openModal && (
        <ModalConfirm
          message="Desea eliminar este parámetro?"
          setOpenModal={setOpenModal}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
};

export default CargaDeParametrosGenerales;
