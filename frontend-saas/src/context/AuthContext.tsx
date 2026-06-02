'use client';

import { createContext, ReactNode, useState } from 'react';
import api from '../lib/axios';

type AuthCredentials = {
  email: string;
  password: string;
};

type AuthUser = {
  id?: string;
  email?: string;
  role?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading] = useState(false);

  const login = async (credentials: AuthCredentials) => {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('token', data.access_token);
    setUser(data.user ?? null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
