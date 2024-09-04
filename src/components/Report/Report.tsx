import { FormEvent, useState } from "react";
import { updateSpreadSheet } from "../../utils/spreadSheet/updateSpreadSheet";
import { toast } from "react-toastify";

const Report = (): JSX.Element => {
  type Date = {
    month: number;
    year: number;
  };
  const [date, setDate] = useState<Date>({ month: 0, year: 0 });

  const handleExport = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL_API;
    if (date.month && date.year) {
      const result = await updateSpreadSheet(
        date.month.toString(),
        date.year.toString()
      );
      if (result.ok) {
        window.open(
          `${BASE_URL}/planillamensual/exportar/${date.month}/${date.year}`,
          "_blank"
        );
      } else {
        toast.error(result.message);
      }
    }
  };

  const handleChange = (e: FormEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setDate({
      ...date,
      [name]: parseInt(value),
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#2c3e50] rounded-lg shadow-md space-y-4 my-5">
      <div className="flex flex-col space-y-2">
        <label htmlFor="month" className="text-[#ecf0f1] font-semibold">
          Mes:
        </label>
        <select
          name="month"
          id="month"
          onChange={handleChange}
          className="border-[#34495e] rounded-md shadow-sm focus:ring-2 focus:ring-[#1abc9c] focus:border-[#1abc9c] p-2 bg-[#2c3e50] text-[#ecf0f1]"
        >
          <option value={1}>Enero</option>
          <option value={2}>Febrero</option>
          <option value={3}>Marzo</option>
          <option value={4}>Abril</option>
          <option value={5}>Mayo</option>
          <option value={6}>Junio</option>
          <option value={7}>Julio</option>
          <option value={8}>Agosto</option>
          <option value={9}>Septiembre</option>
          <option value={10}>Octubre</option>
          <option value={11}>Noviembre</option>
          <option value={12}>Diciembre</option>
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="year" className="text-[#ecf0f1] font-semibold">
          Año:
        </label>
        <input
          type="number"
          min={0}
          step={1}
          id="year"
          name="year"
          value={date?.year}
          onInput={handleChange}
          className="border-[#34495e] rounded-md shadow-sm focus:ring-2 focus:ring-[#1abc9c] focus:border-[#1abc9c] p-2 bg-[#2c3e50] text-[#ecf0f1]"
        />
      </div>

      <button
        onClick={handleExport}
        className="w-full bg-[#1abc9c] text-white py-2 rounded-md shadow-md hover:bg-[#16a085] focus:outline-none focus:ring-2 focus:ring-[#1abc9c] transition duration-200"
      >
        EXPORTAR
      </button>
    </div>
  );
};

export { Report };
