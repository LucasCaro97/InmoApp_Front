import { toast } from "react-toastify";
import { ModalForm } from "../ModalForm/ModalForm";
import { getRenters } from "../../utils/renters/getRenters";
import { getIndexList } from "../../utils/indexs/getIndexsList";
import { getProperties } from "../../utils/properties/getProperties";
import { getContractTypes } from "../../utils/contractTypes/getContractTypes";
import { createNewContract } from "../../utils/contract/createNewContract";
import { validateContractForm } from "../../utils/validation/validateContractForm";
import { FormEvent, useEffect, useState } from "react";
import styles from "./ContractForm.module.css";
import { useParams } from "react-router-dom";
import { getContract } from "../../utils/contract/getContract";
import { editContract } from "../../utils/contract/editContract";

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
  const [contractTypes, setNewContractTypes] = useState<Array<ContractType>>();
  const [indexs, setIndexs] = useState<Array<Index>>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [endpoint, setEndPoint] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    const checkParams = async () => {
      if (id?.length) {
        setEditMode(true);
        const result = await getContract(id);
        if (result.ok && result.data)
          setNewContract({
            inmuebleId: result.data.inmueble?.id ?? 0,
            inquilinoId: result.data.inquilino?.id ?? 0,
            tipoContratoId: result.data.tipoContrato?.id ?? 0,
            fechaInicio: result.data.fechaInicio,
            fechaFin: result.data.fechaFin,
            observaciones: result.data.observaciones,
            estadoContrato:
              result?.data?.estadoContrato &&
              typeof result?.data?.estadoContrato !== "number"
                ? result.data.estadoContrato.id
                : 0,
            importeBase: result.data.importeBase,
            indice:
              (typeof result.data.indice !== "number" &&
                result.data.indice.id) ||
              0,
            actualizaCada: result.data.actualizaCada,
          });
      }
    };
    checkParams();
  }, []);

  useEffect(() => {
    const loadValues = async () => {
      const properties = await getProperties();
      const alquileres = properties.data?.filter((p) => p.esAlquiler);
      const renters = await getRenters();
      const contractTypeList = await getContractTypes();
      const indexList = await getIndexList();

      if (contractTypeList.ok && contractTypeList.data?.length) {
        setNewContractTypes(contractTypeList.data);
      }
      if (properties.ok && renters) {
        setPropertiesList(alquileres);
        setRentersList(renters);
      }
      if (indexList.ok && indexList.data) {
        setIndexs(indexList.data);
      }
    };
    loadValues();
  }, [openForm]);

  const handleInputChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    if (name === "actualizaCada" || name === "importeBase") {
      setNewContract({
        ...newContract,
        [name]: Number(value),
      });
    } else {
      setNewContract({
        ...newContract,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    const selectedValue: string = e.currentTarget.value;
    const name = e.currentTarget.name;
    setNewContract({
      ...newContract,
      [name]: Number(selectedValue),
    });
  };
  const handleOpenForm = (endpoint: string) => {
    setOpenForm(true);
    setEndPoint(endpoint);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validate = validateContractForm(newContract);
    if (validate.ok) {
      if (editMode) {
        const resul = await editContract(id, newContract);
        resul.ok ? toast.success(resul.message) : toast.error(resul.message);
      } else {
        const resul = await createNewContract(newContract);
        resul.ok ? toast.success(resul.message) : toast.error(resul.message);
      }
    } else {
      toast.error(validate.message);
    }
  };
  return (
    <>
      {openForm ? (
        <ModalForm endpoint={endpoint} setOpenForm={setOpenForm} />
      ) : null}
      <div className="flex flex-col place-items-center p-5">
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <h3 className={styles.title}>
            {editMode ? "Editar" : "Nuevo"} contrato
          </h3>
          <label htmlFor="inmuebleId">Inmueble</label>
          <select
            onChange={handleSelectChange}
            name="inmuebleId"
            id="inmuebleId"
            value={newContract.inmuebleId}
          >
            <option value="">Seleccione un inmueble</option>
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
            <option value="">Seleccione un inquilino</option>
            {rentersList?.map((inq, i) => (
              <option key={inq.nombreCompleto + i} value={inq.id}>
                {inq.nombreCompleto}
              </option>
            ))}
          </select>

          <div className={styles.section}>
            <div>
              <label htmlFor="tipoContratoId">Tipo de contrato</label>
              <select
                onChange={handleSelectChange}
                name="tipoContratoId"
                id="tipoContratoId"
                value={newContract.tipoContratoId}
              >
                <option value="">Seleccione un tipo de contrato</option>
                {contractTypes?.map((c, i) => (
                  <option key={i} value={c.id}>
                    {c && c.nombre[0].toLocaleUpperCase() + c.nombre.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <span
              onClick={() => {
                handleOpenForm("tipocontrato");
              }}
            >
              +
            </span>
          </div>

          <label htmlFor="indexSelect">Indice:</label>
          <select
            name="indice"
            id="indexSelect"
            value={
              typeof newContract.indice === "number" ? newContract.indice : 0
            }
            onChange={handleSelectChange}
          >
            <option value="">Seleccione un índice</option>
            {indexs.map((index, i) => (
              <option key={index.nombre + i} value={index.id}>
                {index.nombre}
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

          <label htmlFor="estadoContrato">Estado:</label>
          <select
            onChange={handleSelectChange}
            name="estadoContrato"
            id="estadoContrato"
            value={
              typeof newContract.estadoContrato === "number"
                ? newContract.estadoContrato
                : 0
            }
          >
            <option value={0} disabled>
              Seleccione un estado.
            </option>
            <option value={1}>En trámite</option>
            <option value={2}>Frimado</option>
            <option value={3}>Resindido</option>
          </select>

          <label htmlFor="importeBase">Precio base:</label>
          <input
            min={0}
            step={0.1}
            type="number"
            placeholder="$"
            id="importeBase"
            name="importeBase"
            onChange={handleInputChange}
            value={newContract.importeBase}
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

          <label htmlFor="observaciones">Observaciones</label>
          <textarea
            id="observaciones"
            onInput={handleInputChange}
            name="observaciones"
            value={newContract.observaciones}
            rows={5}
          />

          <button type="submit">
            {editMode ? "Editar" : "Crear"} contrato
          </button>
        </form>
      </div>
    </>
  );
};

export { ContractForm };
