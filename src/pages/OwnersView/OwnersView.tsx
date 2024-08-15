import { useState } from "react";
import { OwnerForm } from "../../components/OwnerForm/OwnerForm";
import { OwnersTable } from "../../components/OwnersTable/OwnersTable";

const OwnersView = (): JSX.Element => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const handleOpenForm = () => {
    setOpenForm(!openForm);
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Propietarios</h2>
      <button
        className="bg-green-900 text-slate-300 text-lg px-6 py-1 rounded-xl hover:bg-green-700 transition duration-300"
        onClick={handleOpenForm}
      >
        {openForm ? "Cerrar formulario" : "Nuevo Propietario"}
      </button>
      {openForm ? <OwnerForm setOpenForm = {setOpenForm}/> : null}
      <OwnersTable openForm = {openForm}/>
    </div>
  );
};
export { OwnersView };
