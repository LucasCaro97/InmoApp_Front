import React, { useState } from "react";
import { getToken } from "../../utils/auth/localStorage";
import axios from "axios";
import { getSpreadSheet } from "../../utils/spreadSheet/getSpreadSheet";


type Props = {
  spreadSheet: SpreadSheet | undefined;
  setSpreadSheet: (data: SpreadSheet) => void;
  month: number; // Otras props que necesites
  year: number; // Otras props que necesites
};

const ReportTable = ({ spreadSheet, setSpreadSheet, month, year }: Props): JSX.Element => {
  const [editedRowIndex, setEditedRowIndex] = useState<number | null>(null);
  const [serviceValue, setServiceValue] = useState<{ [key: number]: string }>(
    {}
  ); // Almacenar valores de "Servicios" por fila

  // Almacenar el valor actualizado cuando el contenido editable cambia
  const handleServiceChange = (
    e: React.FormEvent<HTMLTableCellElement>,
    rowIndex: number
  ) => {
    setServiceValue({
      ...serviceValue,
      [rowIndex]: e.currentTarget.textContent || "",
    });
  };

  // Función para guardar los cambios
  const handleSaveClick = async (rowIndex: number, detalleId: number) => {
    const nuevoValorServicios = parseFloat(serviceValue[rowIndex]); // Convierte a número decimal
    if (isNaN(nuevoValorServicios)) {
      console.error('El nuevo valor de servicios no es un número válido');
      return; // Salir si el valor no es válido
    }
    // Aquí llamas a tu API para guardar el dato en la base de datos
    try{
      const token = getToken();
      const BASE_URL = import.meta.env.VITE_BASE_URL_API;

      // Hacer la solicitud PUT
    const response = await axios.put(
      `${BASE_URL}/planilladetalle/${detalleId}`,
      nuevoValorServicios,
       // Si no necesitas enviar un cuerpo, puedes dejarlo vacío o enviar un objeto vacío
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      const result = await getSpreadSheet(month, year);
      if (result.ok && result.data) {
        setSpreadSheet(result.data); // Actualiza el estado con los nuevos datos
      } else {
        console.error(result.message);
      }
      // Aquí puedes hacer algo más, como actualizar el estado local o mostrar un mensaje de éxito
    } else {
      console.log('Error al actualizar el valor de servicios');
    }
  }catch(error){
    console.error('Error en la solicitud PUT:', error);
  }
  setEditedRowIndex(null); // Salir del modo de edición
  };

  return (
    <>
      <h3>Planilla de cobros mensual</h3>
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
                Fecha Contrato
              </th>
              <th className="border border-gray-300 px-4 py-2">Ubicación</th>
              <th className="border border-gray-300 px-4 py-2">Importe</th>
              <th className="border border-gray-300 px-4 py-2">Servicios</th>
              <th className="border border-gray-300 px-4 py-2">A cobrar</th>
              <th className="border border-gray-300 px-4 py-2">Honorarios</th>
              <th className="border border-gray-300 px-4 py-2">A rendir</th>
              <th className="border border-gray-300 px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {spreadSheet.detalles.map((detalle, rowIndex) => (
              <tr key={detalle.id}>
                <td className="border border-gray-300 p-1">
                  {detalle.contrato.propietario?.nombreCompleto ?? "N/A"}
                </td>
                <td className="border border-gray-300 p-1">
                  {detalle.contrato.inquilino?.nombreCompleto ?? "N/A"}
                </td>
                <td className="border border-gray-300 p-1">
                  {detalle.contrato.tipoContrato?.nombre ?? "N/A"}
                </td>
                <td className="border border-gray-300 p-1">
                  {detalle.contrato.fechaInicio ?? "N/A"}
                </td>
                <td className="border border-gray-300 p-1">
                  {detalle.contrato.inmueble?.direccion ?? "N/A"}
                </td>
                <td className="border border-gray-300 p-1">
                  {detalle.importeAlquiler.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>

                {/* Celda editable usando contentEditable */}
                <td className="border border-gray-300 p-1">
                  {editedRowIndex === rowIndex ? (
                    <input
                      type="number"
                      value={
                        serviceValue[rowIndex] ?? detalle.expensas ?? "0.00"
                      }
                      onChange={(e) =>
                        setServiceValue({
                          ...serviceValue,
                          [rowIndex]: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  ) : (
                    serviceValue[rowIndex] ?? detalle.expensas ?? "0.00"
                  )}
                </td>
                <td className="border border-gray-300 p-1">
                  {(
                    detalle.importeAlquiler + detalle.expensas
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>

                <td className="border border-gray-300 p-1">
                  {detalle.honorarios.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>

                <td className="border border-gray-300 p-1">
                  {(
                    detalle.importeAlquiler - detalle.honorarios
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>

                {/* Botón para alternar entre editar y guardar */}
                <td className="border border-gray-300 p-1">
                  {editedRowIndex === rowIndex ? (
                    <button
                      onClick={() => handleSaveClick(rowIndex, detalle.id)}
                    >
                      ✅ Guardar
                    </button>
                  ) : (
                    <button onClick={() => setEditedRowIndex(rowIndex)}>
                      ✏️ Editar
                    </button>
                  )}
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
