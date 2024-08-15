import { FormEvent, useState } from "react";
import styles from "./ModalForm.module.css";
import { toast } from "react-toastify";
import { createContractType } from "../../utils/contractTypes/createContractType";
type Props = {
  endpoint: string;
  setOpenForm: (value: boolean) => void;
};

const ModalForm = ({ endpoint, setOpenForm }: Props): JSX.Element => {
  const [input, setInput] = useState("");
  const labelStr = "Tipo de contrato:";

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInput(value);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await createContractType(input);
    if (result.ok) {
      toast.success(result.message);
      setOpenForm(false);
    } else {
      toast.error(result.message);
    }
  };
  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
    setOpenForm(false);
  };
  return (
    <>
      <div className={styles.overlay} onClick={() => setOpenForm(false)} />
      <div className={styles.modal}>
        <form>
          <div className="flex flex-col">
            <label htmlFor="">{labelStr}</label>
            <input type="text" value={input} onChange={handleInputChange} />
            <div>
              <button className={styles.acceptButton} onClick={handleSubmit}>
                Crear
              </button>
              <button className={styles.cancelButton} onClick={handleCancel}>
                Cerrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { ModalForm };
