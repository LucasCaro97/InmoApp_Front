import { useContext, useEffect, useState } from "react";
import { getOwners } from "../../utils/owners/getOwners";
import deleteImage from "../../icons/delete.png";
import editImage from "../../icons/edit.png";
import { deleteOwner } from "../../utils/owners/deleteOwner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ModalConfirm } from "../ModalConfirm/ModalConfirm";
import { MyContext } from "../../store/Provider";
type Props = {
  openForm: boolean;
};
const OwnersTable = ({ openForm }: Props): JSX.Element => {
  const context = useContext(MyContext);
  const owners = context?.state.owners;
  const saveOwners = context?.saveOwners;
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [ownerToDelete, setOwnerToDelete] = useState<number>();
  useEffect(() => {
    const loadOwners = async () => {
      const result = await getOwners();
      if (result) {
        saveOwners!(result);
      }
    };
    loadOwners();
  }, [openForm]);
  const handleDelete = async (id: number | undefined) => {
    if (id) {
      setOwnerToDelete(id);
      setOpenModal(true);
    }
  };
  const confirmDelete = async () => {
    if (ownerToDelete !== undefined) {
      const result = await deleteOwner(ownerToDelete);
      console.log(result);
      if (result.ok) {
        toast.success(result.message);
        owners &&
          saveOwners!(owners.filter((owner) => owner.id !== ownerToDelete));
      } else {
        toast.error("No se puedo eliminar el propietario");
      }
    }
  };
  const handleEdit = (id: number | undefined) => {
    navigate(`/editarPropietario/${id}`);
  };
  return (
    <div className="ownersTable">
      {openModal ? (
        <ModalConfirm
          message="Desea eliminar el propietario?"
          setOpenModal={setOpenModal}
          onConfirm={confirmDelete}
        />
      ) : null}
      <div className="container mx-auto mb-4">
        {owners && owners.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  Propietario
                </th>
                <th className="border border-gray-300 px-4 py-2">DNI</th>
                <th className="border border-gray-300 px-4 py-2">CUIL</th>
                <th className="border border-gray-300 px-4 py-2">Teléfono</th>
                <th className="border border-gray-300 px-4 py-2">Dirección</th>
                <th className="border border-gray-300 px-4 py-2">Correo</th>
                <th className="border border-gray-300 px-4 py-2">
                  Comisión (%)
                </th>
              </tr>
            </thead>
            <tbody>
              {owners?.map((owner, i) => (
                <tr key={owner.dni + i}>
                  <td className="border border-gray-300 px-4 py-2">
                    {owner.id || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {owner.nombreCompleto}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {owner.dni}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {owner.cuil}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {owner.telefono}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {owner.direccion}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {owner.correo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {owner.porcentaje_comision}%
                  </td>
                  <td>
                    <span className="iconsRow">
                      <img
                        src={deleteImage}
                        onClick={() => handleDelete(owner.id)}
                      />
                      <img
                        src={editImage}
                        onClick={() => handleEdit(owner.id)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No hay propietarios disponibles.</p>
        )}
      </div>
    </div>
  );
};
export { OwnersTable };
