import { useState } from "react";
import { OwnerForm } from "../../components/OwnerForm/OwnerForm";
import { OwnersTable } from "../../components/OwnersTable/OwnersTable";

const OwnersView = (): JSX.Element => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const handleOpenForm = () => {
    setOpenForm(!openForm);
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Propietarios</h2>
      <button onClick={handleOpenForm}>
        {openForm ? "Cerrar formulario" : "Nuevo Propietario"}
      </button>
      {openForm ? <OwnerForm /> : null}
      <OwnersTable />
    </>
  );
};
export { OwnersView };
