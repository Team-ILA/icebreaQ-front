import React, { createContext, useMemo, useState } from 'react';

type AuthValueType = {
  email: string;
  username: string;
};

type AuthActionType = {
  signIn: (user: AuthValueType) => void;
  signOut: () => void;
};

export const AuthValueContext = createContext<AuthValueType>(
  {} as AuthValueType
);

export const AuthActionContext = createContext<AuthActionType>(
  {} as AuthActionType
);

const initalValue: AuthValueType = {
  email: '',
  username: '',
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthValueType>(initalValue);
  const actions = useMemo(
    () => ({
      signIn(user: AuthValueType) {
        setAuth(user);
      },
      signOut() {
        setAuth(initalValue);
      },
    }),
    []
  );

  return (
    <AuthActionContext.Provider value={actions}>
      <AuthValueContext.Provider value={auth}>
        {children}
      </AuthValueContext.Provider>
    </AuthActionContext.Provider>
  );
};

export default AuthProvider;
