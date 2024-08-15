import { useEffect, useState } from "react";
import { getRenters } from "../../utils/renters/getRenters";
import deleteImage from "../../icons/delete.png";
import editImage from "../../icons/edit.png";
import { deleteRenter } from "../../utils/renters/deleteRenter";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ModalConfirm } from "../ModalConfirm/ModalConfirm";
import "./styles.css";
type Props = {
  openForm : boolean
}
const RentersTable = ({openForm } : Props ): JSX.Element => {
  const navigate = useNavigate();
  const [renters, setRenters] = useState<Array<Renter>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [renterToDelete, setRenterToDelete] = useState<number>();
  useEffect(() => {
    const loadOwners = async () => {
      const result = await getRenters();
      if (result) {
        setRenters(result);
      }
    };
    loadOwners();
  }, [openForm]);
  const handleDelete = async (id: number | undefined) => {
    if (id) {
      setRenterToDelete(id);
      setOpenModal(true);
    }
  };
  const confirmDelete = async () => {
    if (renterToDelete !== undefined) {
      const result = await deleteRenter(renterToDelete);
      console.log(result);
      if (result.ok) {
        toast.success(result.message);
        setRenters(renters.filter((renter) => renter.id !== renterToDelete));
      } else {
        toast.error("No se puedo eliminar el inquilino");
      }
    }
  };
  const handleEdit = (id: number | undefined) => {
    navigate(`/editarInquilino/${id}`);
  };
  return (
    <div className="ownersTable">
      {openModal ? (
        <ModalConfirm
          message="Desea eliminar el inquilino?"
          setOpenModal={setOpenModal}
          onConfirm={confirmDelete}
        />
      ) : null}
      <div className="container mx-auto mb-4">
        {renters.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Inquilino</th>
                <th className="border border-gray-300 px-4 py-2">DNI</th>
                <th className="border border-gray-300 px-4 py-2">CUIL</th>
                <th className="border border-gray-300 px-4 py-2">Teléfono</th>
                <th className="border border-gray-300 px-4 py-2">Correo</th>
              </tr>
            </thead>
            <tbody>
              {renters?.map((renter, i) => (
                <tr key={renter.dni + i}>
                  <td className="border border-gray-300 px-4 py-2">
                    {renter.id || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {renter.nombreCompleto}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {renter.dni}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {renter.cuil}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {renter.telefono}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {renter.correo}
                  </td>
                  <td>
                    <span className="iconsRow">
                      <img
                        src={deleteImage}
                        onClick={() => handleDelete(renter.id)}
                      />
                      <img
                        src={editImage}
                        onClick={() => handleEdit(renter.id)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No hay inquilinos disponibles.</p>
        )}
      </div>
    </div>
  );
};
export { RentersTable };
