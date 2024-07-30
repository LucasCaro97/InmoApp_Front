import styles from "./ModalConfirm.module.css";

type Props = {
  message: string;
  setOpenModal: (value: boolean) => void;
  onConfirm: () => void;
};

const ModalConfirm = ({
  message,
  setOpenModal,
  onConfirm,
}: Props): JSX.Element => {
  return (
    <>
      <div className={styles.overlay} onClick={() => setOpenModal(false)} />
      <div className={styles.modal}>
        <h3>{message}</h3>
        <button
          className={styles.acceptButton}
          onClick={() => {
            onConfirm();
            setOpenModal(false);
          }}
        >
          Aceptar
        </button>
        <button
          className={styles.cancelButton}
          onClick={() => setOpenModal(false)}
        >
          Cancelar
        </button>
      </div>
    </>
  );
};

export { ModalConfirm };
