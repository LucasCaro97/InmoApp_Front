import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOwnerById } from "../../utils/getOwners";

const EditOwner = (): JSX.Element => {
  const { id } = useParams();
  const [owner, setOwner] = useState<Owner>();
  useEffect(() => {
    const loadOwner = async (id: number) => {
      const result = await getOwnerById(id);
      if (result) {
        setOwner(result);
      }
    };
    id && loadOwner(Number(id));
  }, []);
  return (
    <section>
      <h2>{`Propietario ${id}`}</h2>
      <h3>{owner?.nombreCompleto}</h3>
      <p>{owner?.correo}</p>
    </section>
  );
};
export { EditOwner };
