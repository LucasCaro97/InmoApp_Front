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

  return (
    <MyContext.Provider
      value={{ state, saveParameters, saveOwners, saveRenters }}
    >
      {children}
    </MyContext.Provider>
  );
};
