"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { User } from "@/lib/api/types/auth.types";
import { auth } from "@/lib/api/client";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth.hasCredentials()) {
      setUser({ name: "admin", email: "" });
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((username: string, password: string) => {
    auth.setCredentials(username, password);
    setUser({ name: username, email: "" });
  }, []);

  const logout = useCallback(() => {
    auth.clearCredentials();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}