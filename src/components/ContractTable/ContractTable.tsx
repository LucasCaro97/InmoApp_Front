import editImage from "../../icons/edit.png";
import deleteImage from "../../icons/delete.png";
import { useNavigate } from "react-router-dom";
type Props = {
  contracts: Array<Contract>;
};
const ContractTable = ({ contracts }: Props): JSX.Element => {
  const navigate = useNavigate();
  const formatDate = (date: string): string => {
    return date.split("-").reverse().join("/");
  };

  const handleEdit = (id: number | undefined) => {
    if (id) {
      navigate(`/formulario-contrato/${id}`);
    }
  };
  return (
    <div className="py-4 px-4">
      {contracts && contracts.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-2">ID</th>
              <th className="border border-gray-300 px-2 py-2">Inquilino</th>
              <th className="border border-gray-300 px-2 py-2">Propietario</th>
              <th className="border border-gray-300 px-4 py-2">Inmueble</th>
              <th className="border border-gray-300 px-2 py-2">
                Tipo contrato
              </th>
              <th className="border border-gray-300 px-2 py-2">Estado</th>
              <th className="border border-gray-300 px-2 py-2">Fecha inicio</th>
              <th className="border border-gray-300 px-2 py-2">Fecha fin</th>
              <th className="border border-gray-300 px-2 py-2">
                Actualza cada
              </th>
              <th className="border border-gray-300 px-2 py-2">Importe base</th>
              <th className="border border-gray-300 px-2 py-2">Indice</th>

              <th className="border border-gray-300 px-2 py-2">
                Observaciones
              </th>
              <th className="border border-gray-300 px-2 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {contracts?.map((contract, i) => (
              <tr key={contract.fechaInicio + i}>
                <td className="border border-gray-300 px-2 py-2">
                  {contract.id || "N/A"}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {contract.inquilino?.nombreCompleto}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {contract.propietario?.nombreCompleto}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {contract.inmueble?.direccion}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {contract.tipoContrato?.nombre}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {typeof contract.estadoContrato !== "number" &&
                  contract.estadoContrato
                    ? contract.estadoContrato.nombre[0].toUpperCase() +
                      contract.estadoContrato.nombre.slice(1)
                    : "N/A"}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {formatDate(contract.fechaInicio)}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {formatDate(contract.fechaFin)}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {contract.actualizaCada} Meses
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {contract.importeBase}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {typeof contract.indice !== "number"
                    ? contract.indice.nombre
                    : "N/A"}
                </td>
                <td className="border border-gray-300 px-3 py-1">
                  {contract.observaciones}
                </td>
                <td className="border border-gray-300 px-3 py-1">
                  <span className="iconsRow">
                    <img src={deleteImage} />
                    <img
                      src={editImage}
                      onClick={() => handleEdit(contract.id)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No hay contratos disponibles.</p>
      )}
    </div>
  );
};

export { ContractTable };
