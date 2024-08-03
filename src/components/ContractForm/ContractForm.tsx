import { FormEvent, useEffect, useState } from "react";
import { getProperties } from "../../utils/properties/getProperties";
import { getRenters } from "../../utils/renters/getRenters";
import styles from "./ContractForm.module.css";
import { toast } from "react-toastify";

const ContractForm = (): JSX.Element => {
  const initialState: Contract = {
    inmuebleId: 0,
    inquilinoId: 0,
    tipoContratoId: 0,
    fechaInicio: "",
    fechaFin: "",
    observaciones: "",
    estadoContrato: 0,
    importeBase: 0,
    indice: 0,
    actualizaCada: 0,
  };
  const [newContract, setNewContract] = useState<Contract>(initialState);
  const [propertiesList, setPropertiesList] = useState<Array<Property>>();
  const [rentersList, setRentersList] = useState<Array<Renter>>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadValues = async () => {
      const properties = await getProperties();
      const renters = await getRenters();
      if (properties.ok && renters) {
        setPropertiesList(properties.data);
        setRentersList(renters);
      }
    };
    loadValues();
  }, []);

  const handleInputChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    console.log(value);
    setNewContract({
      ...newContract,
      [name]: value,
    });
  };
  const handleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    const selectedValue: string = e.currentTarget.value;
    const name = e.currentTarget.name;
    setNewContract({
      ...newContract,
      [name]: parseInt(selectedValue),
    });
  };
  useEffect(() => {
    if (new Date(newContract.fechaInicio) > new Date(newContract.fechaFin)) {
      setError("ERROR");
    } else {
      setError("");
    }
  }, [newContract]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    error.length > 0 ? toast.error(error) : toast.success("OK");
  };
  return (
    <>
      <h3 className={styles.title}>Nuevo contrato</h3>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <label htmlFor="inmuebleId">Inmueble</label>
        <select
          onChange={handleSelectChange}
          name="inmuebleId"
          id="inmuebleId"
          value={newContract.inmuebleId}
        >
          <option value="" disabled>
            Seleccione un inmueble
          </option>
          {propertiesList?.map((p, i) => (
            <option key={p.nombre + i} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>

        <label htmlFor="inquilinoId">Inquilino</label>
        <select
          onChange={handleSelectChange}
          name="inquilinoId"
          id="inquilinoId"
          value={newContract.inquilinoId}
        >
          <option value="" disabled>
            Seleccione un inquilino
          </option>
          {rentersList?.map((inq, i) => (
            <option key={inq.nombreCompleto + i} value={inq.id}>
              {inq.nombreCompleto}
            </option>
          ))}
        </select>

        <label htmlFor="fechaInicio">Fecha de inicio</label>
        <input
          type="date"
          id="fechaInicio"
          name="fechaInicio"
          onChange={handleInputChange}
          value={newContract.fechaInicio}
        />

        <label htmlFor="fechaFin">Fecha de fin</label>
        <input
          type="date"
          id="fechaFin"
          name="fechaFin"
          onChange={handleInputChange}
          value={newContract.fechaFin}
        />

        <label htmlFor="observaciones">Observaciones</label>
        <textarea
          id="observaciones"
          onInput={handleInputChange}
          name="observaciones"
          value={newContract.observaciones}
          rows={5}
        />

        <button type="submit">Crear contrato</button>
      </form>
    </>
  );
};
export { ContractForm };
