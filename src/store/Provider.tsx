import React, { createContext, ReactNode, useState } from "react";
interface Children {
  children: ReactNode;
}

interface GlobalState {
  renters: Renter[];
  owners: Owner[];
  parameters: Parameter[];
}

interface GlobalContextProps {
  state: GlobalState;
  saveParameters: (parameters: Parameter[]) => void;
  saveOwners: (owners: Owner[]) => void;
  saveRenters: (renters: Renter[]) => void;
  filterParameters: (value: string) => void;
  filterOwners: (value: string) => void;
  filterRenters: (value: string) => void;
}

export const MyContext = createContext<GlobalContextProps | undefined>(
  undefined
);

export const Provider: React.FC<Children> = ({ children }) => {
  const initialState: GlobalState = {
    renters: [],
    owners: [],
    parameters: [],
  };

  const [state, setState] = useState<GlobalState>(initialState);

  const saveParameters = (parameters: Parameter[]) => {
    setState((prevState) => ({
      ...prevState,
      parameters: parameters,
    }));
  };

  const saveOwners = (owners: Owner[]) => {
    setState((prevState) => ({
      ...prevState,
      owners: owners,
    }));
  };

  const saveRenters = (renters: Renter[]) => {
    setState((prevState) => ({
      ...prevState,
      renters: renters,
    }));
  };

  const filterOwners = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      owners: prevState.owners.filter((o) =>
        o.nombreCompleto.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      ),
    }));
  };

  const filterRenters = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      renters: prevState.renters.filter((r) =>
        r.nombreCompleto.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      ),
    }));
  };
  const filterParameters = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      parameters: prevState.parameters.filter((p) =>
        p.nombre.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      ),
    }));
  };

  return (
    <MyContext.Provider
      value={{
        state,
        saveParameters,
        saveOwners,
        saveRenters,
        filterParameters,
        filterOwners,
        filterRenters,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
