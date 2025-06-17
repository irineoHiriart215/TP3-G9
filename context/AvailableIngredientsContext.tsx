import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

type Ingredient = {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
};

type AvailableIngredientsContextType = {
  availableIngredients: Ingredient[];
  toggleIngredient: (ingredient: Ingredient) => void;
  isAvailable: (ingredient: Ingredient) => boolean;
};

const AvailableIngredientsContext = createContext<AvailableIngredientsContextType | undefined>(undefined);

export const AvailableIngredientsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);
  const storageKey = user ? `availableIngredients-${user.email}` : null;

  // Cargar al iniciar sesión
  useEffect(() => {
    const loadIngredients = async () => {
      if (!storageKey) return;
      const stored = await AsyncStorage.getItem(storageKey);
      if (stored) {
        setAvailableIngredients(JSON.parse(stored));
      } else {
        setAvailableIngredients([]);
      }
    };
    loadIngredients();
  }, [storageKey]);

  // Guardar al cambiar los ingredientes
  const saveToStorage = async (ingredients: Ingredient[]) => {
    if (storageKey) {
      await AsyncStorage.setItem(storageKey, JSON.stringify(ingredients));
    }
  };

  const toggleIngredient = (ingredient: Ingredient) => {
    setAvailableIngredients((prev) => {
      const exists = prev.some((item) => item.idIngredient === ingredient.idIngredient);
      const updated = exists
        ? prev.filter((item) => item.idIngredient !== ingredient.idIngredient)
        : [...prev, ingredient];
      // Guardar después de actualizar
      saveToStorage(updated);
      return updated;
    });
  };

  const isAvailable = (ingredient: Ingredient) =>
    availableIngredients.some((item) => item.idIngredient === ingredient.idIngredient);

  return (
    <AvailableIngredientsContext.Provider
      value={{ availableIngredients, toggleIngredient, isAvailable }}
    >
      {children}
    </AvailableIngredientsContext.Provider>
  );
};

export const useAvailableIngredients = () => {
  const context = useContext(AvailableIngredientsContext);
  if (!context) {
    throw new Error('useAvailableIngredients must be used within an AvailableIngredientsProvider');
  }
  return context;
};
