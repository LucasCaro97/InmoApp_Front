import { ContractTable } from "../../components/ContractTable/ContractTable";
import { FormEvent, useEffect, useState } from "react";
import { getContracts } from "../../utils/contract/getContracts";
import { useNavigate } from "react-router-dom";

const ContractsView = (): JSX.Element => {
  const [contracts, setContracts] = useState<Array<Contract>>([]);
  const navigate = useNavigate();
  const loadContracts = async () => {
    const result = await getContracts();
    if (result.ok && result.data) {
      setContracts(result.data);
    }
  };

  useEffect(() => {
    loadContracts();
  }, []);

  const handleRedirect = (e: FormEvent) => {
    e.preventDefault();
    navigate("/formulario-contrato");
  };

  return (
    <>
      <h2>Contratos</h2>
      <button onClick={handleRedirect}>Nuevo</button>
      <ContractTable contracts={contracts} />
    </>
  );
};

export { ContractsView };
