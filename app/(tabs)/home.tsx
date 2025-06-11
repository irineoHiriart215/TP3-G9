// (tabs)/index.tsx
import React,{useEffect, useState, useContext} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { getRandomMeals } from '@/api/mealdb'
import { MealCard } from '@/components/MealCard';
import { FavoritesContext } from '@/context/FavoritesContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SearchStackParamList } from '@/types/navigation';
type SearchScreenNavigationProp = NativeStackNavigationProp<SearchStackParamList, 'Search'>;

export default function Home() {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const [randomMeals, setRandomMeals] = useState<any[]>([]);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const isMealFavorite = (meal: any) =>
  favorites.some((fav) => fav.idMeal === meal.idMeal);
  const [tendenciaMeals, setTendenciaMeals] = useState<any[]>([]);


  useEffect(() => {
    async function fetchData() {
      const data = await getRandomMeals(12);
      const data2 = await getRandomMeals(12);
      const uniqueResults = data.filter(
        (meal, index, self) =>
        self.findIndex(m => m.idMeal === meal.idMeal) === index
        );
      const unique2 = data2.filter(
        (meal, index, self) =>
        self.findIndex(m => m.idMeal === meal.idMeal) === index
        );
      setRandomMeals(uniqueResults);
      setTendenciaMeals(unique2);
    }
    fetchData();
  }, []);

  return (
    <ParallaxScrollView
      title= "FoodieApp"
      subtitle= "Descubri y guarda tus recetas favoritas"
      scrollable= {true}
      >
      <ThemedView style={[styles.card, {backgroundColor: cardColor}]}>
        <ThemedText type="subtitle" style={styles.cardTitle}>Ultimas Recetas</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {randomMeals.map((meal) => (
            <MealCard
              key={`rec-${meal.idMeal}`}
              meal={meal}
              onPress={() => navigation.navigate('MealDetail', { idMeal: meal.idMeal })}
              isFavorite={isMealFavorite(meal)}
              onToggleFavorite={() => toggleFavorite(meal)}
              style={{ width: 220, marginRight: 12}}
            />
          ))}
        </ScrollView>
      </ThemedView>
      <ThemedView style={[styles.card, {backgroundColor: cardColor}]}>
        <ThemedText type="subtitle" style={styles.cardTitle}>Mis recetas Favoritas</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          { favorites. length === 0 ? (
            <ThemedText style= {{paddingHorizontal: 16, color: textColor}}>
              No hay recetas favoritas todavia.
            </ThemedText>
          ) : (
            favorites.map((meal) => (
              <MealCard
                key={`fav-${meal.idMeal}`}
                meal={meal}
                onPress={() => navigation.navigate('MealDetail', { idMeal: meal.idMeal })}
                isFavorite={isMealFavorite(meal)}
                onToggleFavorite={() => toggleFavorite(meal)}
                style={{ width: 220, marginRight: 12}}
              />
            ))
          )}
        </ScrollView>
      </ThemedView>
      <ThemedView style={[styles.card, {backgroundColor: cardColor}]}>
        <ThemedText type="subtitle" style={styles.cardTitle}>Tendencias</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tendenciaMeals.map((meal) => (
            <MealCard
              key={`ten-${meal.idMeal}`}
              meal={meal}
              onPress={() => navigation.navigate('MealDetail', { idMeal: meal.idMeal })}
              isFavorite={isMealFavorite(meal)}
              onToggleFavorite={() => toggleFavorite(meal)}
              style={{ width: 220, marginRight: 12}}
            />
          ))}
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  titleSection:{
    alignItems: 'flex-start',
  },
  title:{
    fontSize: 28,
    fontWeight: 'bold'
  },
  subtitle: {
    marginTop: 4,
    fontSize: 16,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
  },
});
