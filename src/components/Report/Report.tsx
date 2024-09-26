import { FormEvent, useEffect, useState } from "react";
import { updateSpreadSheet } from "../../utils/spreadSheet/updateSpreadSheet";
import { toast } from "react-toastify";
import { ReportTable } from "../ReportTable/ReportTable";
import { getSpreadSheet } from "../../utils/spreadSheet/getSpreadSheet";

const Report = (): JSX.Element => {
  type Date = {
    month: number;
    year: number;
  };
  const [date, setDate] = useState<Date>({ month: 0, year: 0 });
  const [spreadSheet, setSpreadSheet] = useState<SpreadSheet | undefined>(
    undefined
  );

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

  useEffect(() => {
    const updateTable = async () => {
      const { month, year } = date;
      const result = await getSpreadSheet(month, year);
      if (result.ok && result.data) {
        setSpreadSheet(result.data);
      } else {
        setSpreadSheet(undefined);
      }
    };
    updateTable();
  }, [date]);

  const handleChange = (e: FormEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setDate({
      ...date,
      [name]: parseInt(value),
    });
  };

  return (
    <>
      <div className="max-w-xl mx-auto flex items-center justify-around bg-[#2c3e50] rounded-sm shadow-md p-2 space-x-2 my-5">
        <select
          name="month"
          id="month"
          onChange={handleChange}
          className="border-none rounded-sm  focus:ring-2 focus:ring-[#1abc9c] focus:border-[#1abc9c] p-2 bg-[#3c556e] text-[#ecf0f1] "
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

        <span className="flex flex-row place-items-center">
          <label htmlFor="year" className="mx-1 text-white">
            Año:
          </label>
          <input
            type="number"
            min={0}
            step={1}
            id="year"
            name="year"
            value={date.year}
            onInput={handleChange}
            className="rounded-sm focus:ring-2 focus:ring-[#1abc9c] focus:border-[#1abc9c] p-2 bg-[#3c556e] text-[#ecf0f1] w-20"
          />
        </span>

        <button
          onClick={handleExport}
          className="bg-[#1abc9c] text-white px-4 py-2 rounded-sm shadow-md hover:bg-[#16a085] focus:outline-none focus:ring-2 focus:ring-[#1abc9c] transition duration-200"
        >
          Exportar
        </button>
      </div>

      <ReportTable spreadSheet={spreadSheet} setSpreadSheet={setSpreadSheet} month={date.month} year={date.year}/>
    </>
  );
};

export { Report };
