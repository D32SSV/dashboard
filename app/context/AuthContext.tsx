"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  userName: string | null;
  token: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const login = (token: string, username: string) => {
    setToken(token);
    setUserName(username);
  };
  const logout = () => {
    setToken(null);
    setUserName(null);
  };
  const value: AuthContextType = {
    userName,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
