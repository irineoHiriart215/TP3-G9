// (tabs)/favorites.tsx
import React, {useContext} from 'react';
import { StyleSheet} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FavoritesContext } from '@/context/FavoritesContext';
import { MealCard } from '../../components/MealCard'
import { Receta } from '../../types/Receta'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SearchStackParamList } from '@/types/navigation';
type SearchScreenNavigationProp = NativeStackNavigationProp<SearchStackParamList, 'Search'>;


export default function Favorites() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext)
  const navigation = useNavigation<SearchScreenNavigationProp>();
  

  return (
    <ParallaxScrollView
      title = 'Favoritos'
      scrollable= {true}
      >
      <ThemedView style={styles.cardsContainer}>
        {favorites.length === 0 ? (
          <ThemedText style={styles.emptyText}>No tenés recetas favoritas aún.</ThemedText>
        ) : (
          favorites.map((meal: Receta) => (
            <MealCard
              key={meal.idMeal}
              meal={meal}
              onPress={() => navigation.navigate('MealDetail', { idMeal: meal.idMeal })}
              isFavorite={true}
              style={{width: 360}}
              onToggleFavorite={() => toggleFavorite(meal)}
            />
          ))
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardsContainer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
   emptyText: {
    textAlign: 'center',
    marginTop: 24,
  },
});
