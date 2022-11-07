import React, {
  createContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

type AuthType = {
  email: string;
  username: string;
};

type AuthContextType = [AuthType, Dispatch<SetStateAction<AuthType>>];

type AuthProviderProps = {
  children: React.ReactNode;
};

const initalValue: AuthType = {
  email: '',
  username: '',
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const authState = useState<AuthType>(initalValue);

  const value = useMemo(() => authState, [authState]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
