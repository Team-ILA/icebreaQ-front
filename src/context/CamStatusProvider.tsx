import React, { createContext, useState } from 'react';

type CamStatusType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export const CamStatusContext = createContext<CamStatusType>(
  {} as CamStatusType
);

const CamStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const camStatusState = useState(false);

  return (
    <CamStatusContext.Provider value={camStatusState}>
      {children}
    </CamStatusContext.Provider>
  );
};

export default CamStatusProvider;
