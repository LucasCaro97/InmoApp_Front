import { useEffect, useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { getOwnerById } from "../../utils/owners/getOwners";
import styles from "./OwnerForm.module.css";
import { updateOwner } from "../../utils/owners/updateOwner";
import { toast } from "react-toastify";

const EditOwner = (): JSX.Element => {
  const { id } = useParams();
  const initialState: Owner = {
    nombreCompleto: "",
    dni: "",
    cuil: "",
    telefono: "",
    direccion: "",
    correo: "",
    porcentaje_comision: 0,
  };
  const [newOwner, setNewOwner] = useState<Owner>(initialState);
  useEffect(() => {
    const loadOwner = async (id: number) => {
      const result = await getOwnerById(id);
      if (result) {
        setNewOwner(result);
      }
    };
    id && loadOwner(Number(id));
  }, []);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    const parsedValue: string | number =
      name === "porcentaje_comision" ? Number(value) : value;
    setNewOwner({ ...newOwner, [name]: parsedValue });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await updateOwner(newOwner);
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
          value={newOwner.nombreCompleto}
          onChange={handleInputChange}
        />
        <label htmlFor="dni">DNI:</label>
        <input
          type="number"
          name="dni"
          id="dni"
          value={newOwner.dni}
          onChange={handleInputChange}
        />
        <label htmlFor="cuil">Cuil:</label>
        <input
          type="text"
          name="cuil"
          id="cuil"
          value={newOwner.cuil}
          onChange={handleInputChange}
        />
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          name="telefono"
          id="telefono"
          value={newOwner.telefono}
          onChange={handleInputChange}
        />
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          name="direccion"
          id="direccion"
          value={newOwner.direccion}
          onChange={handleInputChange}
        />
        <label htmlFor="correo">Correo:</label>
        <input
          type="email"
          name="correo"
          id="correo"
          value={newOwner.correo}
          onChange={handleInputChange}
        />
        <label htmlFor="porcentaje_comision">Comisión: %</label>
        <input
          type="number"
          step={0.1}
          accept="."
          min={0}
          max={100}
          name="porcentaje_comision"
          id="porcentaje_comision"
          value={newOwner.porcentaje_comision}
          onChange={handleInputChange}
        />
        <button>Actualizar</button>
      </form>
    </section>
  );
};
export { EditOwner };
