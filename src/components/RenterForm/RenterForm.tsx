import { useState, FormEvent } from "react";
import styles from "./RenterForm.module.css";
import { toast } from "react-toastify";
import { saveNewRenter } from "../../utils/renters/saveNewRenter";
import { validateRenter } from "../../utils/validation/validateRenter";
type Props = {
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
};
const RenterForm = ({ setOpenForm }: Props): JSX.Element => {
  const initialState: Renter = {
    nombreCompleto: "",
    dni: "",
    cuil: "",
    telefono: "",
    correo: "",
  };

  const [newRenter, setNewRenter] = useState<Renter>(initialState);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    setNewRenter({ ...newRenter, [name]: value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validate = validateRenter(newRenter);
    if (!validate.ok && validate.message) {
      toast.error(validate.message);
      return;
    }
    const result = await saveNewRenter(newRenter);
    if (result.ok) {
      setNewRenter(initialState);
      toast.success(result.message);
      setOpenForm(false);
    } else {
      toast.error(result.message);
    }
  };
  return (
    <>
      <h2 className={styles.title}>Nuevo inquilino</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <label htmlFor="nombreCompleto">Nombre completo:</label>
        <input
          type="text"
          name="nombreCompleto"
          id="nombreCompleto"
          value={newRenter.nombreCompleto}
          onChange={handleInputChange}
        />
        <label htmlFor="dni">DNI:</label>
        <input
          type="number"
          name="dni"
          id="dni"
          value={newRenter.dni}
          onChange={handleInputChange}
        />
        <label htmlFor="cuil">Cuil:</label>
        <input
          type="text"
          name="cuil"
          id="cuil"
          value={newRenter.cuil}
          onChange={handleInputChange}
        />
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          name="telefono"
          id="telefono"
          value={newRenter.telefono}
          onChange={handleInputChange}
        />

        <label htmlFor="correo">Correo:</label>
        <input
          type="email"
          name="correo"
          id="correo"
          value={newRenter.correo}
          onChange={handleInputChange}
        />
        <button>Cargar</button>
      </form>
    </>
  );
};
export { RenterForm };
