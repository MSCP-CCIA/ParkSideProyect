// AuthContext.tsx
import React, { createContext, useState, useContext } from 'react';

// Definir la estructura del usuario
interface User {
  id: number | null;
  email: string;
  token: string | null;
  // Puedes agregar más propiedades del usuario si las recibes del backend
}

// Crear el contexto para el usuario
interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

// Provider para envolver la aplicación y proporcionar el contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({ id: null, email: '', token: null });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};