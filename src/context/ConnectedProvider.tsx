import React, { createContext, useState } from 'react';

type ConnectedType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export const ConnectedContext = createContext<ConnectedType>(
  {} as ConnectedType
);

const ConnectedProvider = ({ children }: { children: React.ReactNode }) => {
  const ConnectedState = useState(false);

  return (
    <ConnectedContext.Provider value={ConnectedState}>
      {children}
    </ConnectedContext.Provider>
  );
};

export default ConnectedProvider;
