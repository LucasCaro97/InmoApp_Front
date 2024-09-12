type Props = {
  spreadSheet: SpreadSheet | undefined;
};
const ReportTable = ({ spreadSheet }: Props): JSX.Element => {
  return (
    <>
      <h3>Reporte tabla</h3>
      {spreadSheet ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Propietario</th>
              <th className="border border-gray-300 px-4 py-2">Inquilino</th>
              <th className="border border-gray-300 px-4 py-2">
                Tipo de contrato
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Fecha finalización
              </th>
              <th className="border border-gray-300 px-4 py-2">Ubicación</th>
              <th className="border border-gray-300 px-4 py-2">Importe</th>
              <th className="border border-gray-300 px-4 py-2">Servicios</th>
              <th className="border border-gray-300 px-4 py-2">Honorarios</th>
              <th className="border border-gray-300 px-4 py-2">Fecha cobro</th>
              <th className="border border-gray-300 px-4 py-2">
                Observaciones
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Fecha rendición
              </th>
            </tr>
          </thead>
          <tbody>
            {spreadSheet.detalles.map((detalle, i) => (
              <tr key={detalle.id.toString() + i.toString()}>
                <td className="border border-gray-300 p-1">
                  {detalle.contrato.propietario?.nombreCompleto}
                </td>
                <td className="border border-gray-300 p-1">
                  {detalle.contrato.inquilino?.nombreCompleto}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Ingrese una fecha</p>
      )}
    </>
  );
};
export { ReportTable };
