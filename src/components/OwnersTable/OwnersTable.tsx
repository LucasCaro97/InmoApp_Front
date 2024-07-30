import { useEffect, useState } from "react";
import { getOwners } from "../../utils/getOwners";
import "./styles.css";
const OwnersTable = (): JSX.Element => {
  const [owners, setOwners] = useState<Array<Owner>>();
  useEffect(() => {
    const loadOwners = async () => {
      const result = await getOwners();
      if (result) {
        setOwners(result);
      }
    };
    loadOwners();
  }, []);
  return (
    <div className="ownersTable">
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
              {owners?.map((owner) => (
                <tr key={owner.id || owner.dni}>
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
