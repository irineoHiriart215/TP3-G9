import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const json = await AsyncStorage.getItem('user');
      if (json) setUser(JSON.parse(json));
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const usersJson = await AsyncStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : [];

    const foundUser = users.find(
      (u: User) => u.email === email && u.password === password
    );

    if (!foundUser) throw new Error('Credenciales incorrectas');

    setUser(foundUser);
    await AsyncStorage.setItem('user', JSON.stringify(foundUser));
  };
  
  const register = async (name: string, email: string, password: string) => {
    const usersJson = await AsyncStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : [];

    const exists = users.some((u: User) => u.email === email);
    if (exists) throw new Error('El email ya está registrado');

    const newUser = { name, email, password };
    const updatedUsers = [...users, newUser];
    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

    // Auto-login después del registro
    await login(email, password);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading , login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};
