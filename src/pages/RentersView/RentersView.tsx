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
      <h2 className="text-3xl font-bold mb-4">Inquilinos</h2>
      <button
        className="bg-green-900 text-slate-300 text-lg px-6 py-1 rounded-xl hover:bg-green-700 transition duration-300"
        onClick={handleOpenForm}
      >
        {openForm ? "Cerrar formulario" : "Nuevo Inquilino"}
      </button>
      {openForm ? <RenterForm setOpenForm = {setOpenForm} /> : null}
      <RentersTable openForm={openForm} />
    </div>
  );
};
export { RentersView };
