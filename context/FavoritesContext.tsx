import React, { createContext, useEffect, useState } from 'react';
import { cargarFavoritos, guardarFavoritos } from '@/storage/favoritesStorage';
import { Receta } from '../types/Receta';

interface FavoritesContextProps {
    favorites: Receta[];
    toggleFavorite: (receta: Receta) => void;
}

export const FavoritesContext = createContext<FavoritesContextProps>({
    favorites: [],
    toggleFavorite: () => {},
})

export const FavoritesProvider: React.FC<{children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites ] = useState<Receta[]>([]);

    useEffect(() => {
        cargarFavoritos().then(setFavorites);
    }, [])

    useEffect(() => {
        guardarFavoritos(favorites);
    }, [favorites])

    const toggleFavorite = (receta: Receta) => {
        setFavorites((prev) => {
            const exists = prev.some((r) => r.idMeal === receta.idMeal);
            if (exists) {
                return prev.filter((r) => r.idMeal !== receta.idMeal);
            } else {
                return [...prev, receta];
            }
        });
    };
    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite}}>
            {children}
        </FavoritesContext.Provider>
    );
};