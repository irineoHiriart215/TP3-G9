import AsyncStorage from "@react-native-async-storage/async-storage";
import { Receta } from '../types/Receta'

const FAVORITES_KEY = "@favorites_recipes"

export const guardarFavoritos = async (favorites: Receta[]): Promise<void> => {
    try{
        const jsonValue = JSON.stringify(favorites);
        await AsyncStorage.setItem(FAVORITES_KEY, jsonValue);
    } catch(e){
        console.error('Error guardando favoritos', e)
    }
}

export const cargarFavoritos = async (): Promise<Receta[]> => {
    try{
        const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
        console.error('Error cargando favoritos', e)
        return [];
    }
}