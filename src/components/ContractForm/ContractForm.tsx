import { FormEvent, useEffect, useState } from "react";
import { getProperties } from "../../utils/properties/getProperties";
import { getRenters } from "../../utils/renters/getRenters";
import styles from "./ContractForm.module.css";
import { toast } from "react-toastify";
import { getContractTypes } from "../../utils/contractTypes/getContractTypes";
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
  const [amount, setAmount] = useState(0);
  const [contractTypes, setNewContractTypes] = useState<Array<ContractType>>([
    { id: 1, nombre: "locación" },
    { id: 2, nombre: "comodato" },
  ]);

  useEffect(() => {
    const loadValues = async () => {
      const properties = await getProperties();
      const alquileres = properties.data?.filter((p) => p.esAlquiler);
      const renters = await getRenters();
      const result = await getContractTypes();
      if (result.ok && result.data?.length) {
        setNewContractTypes(result.data);
      }
      if (properties.ok && renters) {
        setPropertiesList(alquileres);
        setRentersList(renters);
      }
    };
    loadValues();
  }, []);

  const handleInputChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    name === "actualizaCada"
      ? setNewContract({
          ...newContract,
          [name]: Number(value),
        })
      : setNewContract({
          ...newContract,
          [name]: value,
        });
  };

  const handleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    const selectedValue: string = e.currentTarget.value;
    const name = e.currentTarget.name;

    if (name === "inmuebleId" || name === "inquilinoId") {
      setNewContract({
        ...newContract,
        [name]: parseInt(selectedValue),
      });
    }
    setNewContract({
      ...newContract,
      [name]: selectedValue,
    });
  };

  useEffect(() => {
    if (new Date(newContract.fechaInicio) > new Date(newContract.fechaFin)) {
      setError("ERROR");
    } else {
      setError("");
    }
    const getAmount = () => {
      const selectedProp = propertiesList
        ?.filter((p) => p.id === Number(newContract.inmuebleId))
        .pop();
      if (selectedProp) {
        setAmount(selectedProp.precioAlquiler);
      }
    };
    getAmount();
  }, [newContract]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(newContract);
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

        <label htmlFor="tipoContratoId">Tipo de contrato</label>
        <select
          onChange={handleSelectChange}
          name="tipoContratoId"
          id="tipoContratoId"
          value={newContract.tipoContratoId}
        >
          <option value="" disabled>
            Seleccione un tipo de contrato
          </option>
          {contractTypes.map((c, i) => (
            <option key={i} value={i}>
              {c && c.nombre[0].toLocaleUpperCase() + c.nombre.slice(1)}
            </option>
          ))}
        </select>

        <label htmlFor="indexSelect">Indice:</label>
        <select
          name="indice"
          id="indexSelect"
          value={newContract.indice}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Seleccione un índice
          </option>
          <option value="ipc">IPC</option>
          <option value="icl">ICL</option>
          <option value="casa_propia">Casa propia</option>
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

        <label htmlFor="actualizaCada">Actualiza cada:</label>
        <input
          type="number"
          id="actualizaCada"
          name="actualizaCada"
          step={1}
          min={1}
          placeholder="1, 2, 3...(Meses)"
          onChange={handleInputChange}
          value={newContract.actualizaCada}
        />

        <label htmlFor="importeBase">Importe base:</label>
        <input
          type="number"
          id="importeBase"
          name="importeBase"
          min={0}
          value={amount}
          onChange={handleInputChange}
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
