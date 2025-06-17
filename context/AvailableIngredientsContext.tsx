import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'availableIngredients';

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
  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setAvailableIngredients(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading available ingredients:', error);
      }
    };
    loadIngredients();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(availableIngredients));
  }, [availableIngredients]);

  const toggleIngredient = (ingredient: Ingredient) => {
    setAvailableIngredients((prev) => {
      const exists = prev.some((item) => item.idIngredient === ingredient.idIngredient);
      if (exists) {
        return prev.filter((item) => item.idIngredient !== ingredient.idIngredient);
      } else {
        return [...prev, ingredient];
      }
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
