// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  role: string | null;
  setToken: (token: string | null) => void;
  setRole: (token: string | null) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  setToken: () => { },
  setRole: () => { },
  logout: () => { },
  isLoggedIn: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [role, setRoleState] = useState<string | null>(null);

  // On first client-side render, retrieve token from localStorage if it exists
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      const storedRole = localStorage.getItem('role');
      if (storedToken) {
        setTokenState(storedToken);
      }
      if (storedRole) {
        setRoleState(storedRole);
      }
    }
  }, []);

  const setToken = (newToken: string | null) => {
    if (typeof window !== 'undefined') {
      if (newToken) {
        localStorage.setItem('token', newToken);
      } else {
        localStorage.removeItem('token');
      }
    }
    setTokenState(newToken);
  };

  const setRole = (userRole: string | null) => {
    if (typeof window !== 'undefined') {
      if (userRole) {
        localStorage.setItem('role', userRole);
      } else {
        localStorage.removeItem('role');
      }
    }
    setRoleState(userRole);
  };

  const logout = () => {
    setTimeout(() => {
      setToken(null);
      setRole(null);
    }, 2000);
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, role, setRole, setToken, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
