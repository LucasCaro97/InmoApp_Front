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
    <div className="mx-auto my-6 p-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#2c3e50]">Contratos</h2>
        <button
          onClick={handleRedirect}
          className="bg-[#1abc9c] text-white text-lg px-6 py-2 rounded-md shadow hover:bg-[#16a085] focus:outline-none focus:ring-2 focus:ring-[#1abc9c] transition duration-200 mb-4"
        >
          Nuevo
        </button>
      </div>
      <ContractTable contracts={contracts} />
    </div>
  );
};

export { ContractsView };
