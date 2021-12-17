import React from 'react';
import { UserPayload } from 'interfaces';

interface IAuthContext {
  authState: UserPayload | null;
  setAuthState: (data: UserPayload) => void;
}

export const AuthContext = React.createContext<IAuthContext>({ authState: null, setAuthState: () => {} });

export const AuthContextProvider: React.FC = (props) => {
  const [state, setState] = React.useState<UserPayload | null>(null);
  const value: IAuthContext = React.useMemo(() => ({ authState: state, setAuthState: setState }), [state]);

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
