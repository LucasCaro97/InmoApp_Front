import { useState } from "react";
import { RenterForm } from "../../components/RenterForm/RenterForm";
import { RentersTable } from "../../components/RentersTable/RentersTable";

const RentersView = (): JSX.Element => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const handleOpenForm = () => {
    setOpenForm(!openForm);
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#2c3e50]">Inquilinos</h2>
        <button
          className="bg-[#1abc9c] text-white text-lg px-6 py-2 rounded-md shadow hover:bg-[#16a085] focus:outline-none focus:ring-2 focus:ring-[#1abc9c] transition duration-200"
          onClick={handleOpenForm}
        >
          {openForm ? "Cerrar formulario" : "Nuevo Inquilino"}
        </button>
      </div>
      {openForm && <RenterForm setOpenForm={setOpenForm} />}
      <RentersTable openForm={openForm} />
    </div>
  );
};
export { RentersView };
