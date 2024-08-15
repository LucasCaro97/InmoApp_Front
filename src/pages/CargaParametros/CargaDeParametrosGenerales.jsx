import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getParams } from "../../utils/params/getParams";
import { ModalConfirm } from "../../components/ModalConfirm/ModalConfirm";
import { deleteParam } from "../../utils/params/deleteParam";
import { updateParam } from "../../utils/params/updateParam";
import { saveNewParam } from "../../utils/params/saveNewParam";
import editImage from "../../icons/edit.png";
import deleteImage from "../../icons/delete.png";
import "./styles.css";
const CargaDeParametrosGenerales = ({ tipoParametro }) => {
  const [parametros, setParametros] = useState([]);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [paramToEdit, setParamToEdit] = useState({});
  const [newParam, setNewParam] = useState("");
  const [paramToDelete, setParamToDelete] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getParams(tipoParametro);
      setParametros(result);
    };
    fetchData();
  }, [newParam, editMode]);

  const handleEdit = (id) => {
    setOpenEditForm(!openEditForm);
    const param = parametros.filter((p) => p.id === id);
    setParamToEdit(param[0]);
    !editMode && setEditMode(true);
  };
  const confirmDelete = async () => {
    if (paramToDelete !== undefined) {
      const result = await deleteParam(paramToDelete, tipoParametro);
      if (result.ok) {
        const newList = parametros.filter((p) => p.id !== paramToDelete);
        setParametros(newList);
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
        {parametros.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {parametros.map((parametro, index) => (
                <tr
                  key={parametro.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-300"}
                >
                  <td className="px-2 py-2 whitespace-nowrap">
                    {parametro.id}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    {parametro.nombre}
                  </td>
                  <td>
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
