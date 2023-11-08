import { createContext } from "react";

export type AuthContextType = {
  isLogged: boolean;
  user: { username: string; email?: string; } | null; 
  login: (username: string, password: string, email: string) => void; 
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  user: null,
  login: (_username: string, _password: string, _email: string) => {},
  logout: () => {},
});
