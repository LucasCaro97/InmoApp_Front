import { useEffect, useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { getRenterById } from "../../utils/renters/getRenters";
import styles from "./OwnerForm.module.css";
import { updateRenter } from "../../utils/renters/updateRenter";
import { toast } from "react-toastify";

const EditRenter = (): JSX.Element => {
  const { id } = useParams();
  const initialState: Renter = {
    nombreCompleto: "",
    dni: "",
    cuil: "",
    telefono: "",
    correo: "",
  };
  const [newRenter, setNewRenter] = useState<Renter>(initialState);
  useEffect(() => {
    const loadRenter = async (id: number) => {
      const result = await getRenterById(id);
      if (result) {
        setNewRenter(result);
      }
    };
    id && loadRenter(Number(id));
  }, []);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    const parsedValue: string | number =
      name === "porcentaje_comision" ? Number(value) : value;
    setNewRenter({ ...newRenter, [name]: parsedValue });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await updateRenter(newRenter);
    result.ok ? toast.success(result.message) : toast.error(result.message);
  };
  return (
    <section>
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
        <button>Actualizar</button>
      </form>
    </section>
  );
};
export { EditRenter };
