import React, { createContext, useState } from 'react';

type AudioStatusType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export const AudioStatusContext = createContext<AudioStatusType>(
  {} as AudioStatusType
);

const AudioStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const audioStatusState = useState(false);

  return (
    <AudioStatusContext.Provider value={audioStatusState}>
      {children}
    </AudioStatusContext.Provider>
  );
};

export default AudioStatusProvider;
