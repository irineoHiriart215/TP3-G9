import { getRandomMeals, searchMeals } from '@/api/mealdb';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState, useContext } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MealCard } from '../../components/MealCard';
import { FavoritesContext } from '@/context/FavoritesContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Search: undefined;
  MealDetail: { idMeal: string };
};

type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

export default function Search() {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [allMeals, setAllMeals] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [showingRandom, setShowingRandom] = useState(true);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({},'text');
  const primary = useThemeColor({}, 'primary');
  const secondary = useThemeColor({}, 'secondary');
  const [isFocused, setIsFocused] = useState(false);


  useFocusEffect(
    useCallback(() => {
      const fetchRandom = async () => {
        const meals = await getRandomMeals(10);
        setAllMeals(meals);
        setResults(meals);
        setVisibleCount(10);
        setSearchQuery('');
        setShowingRandom(true);
      };
      fetchRandom();
    }, [])
  );

  const handleSearch = async () => {
    if (searchQuery.trim().length === 0) {
      const meals = await getRandomMeals(10);
      setAllMeals(meals);
      setResults(meals);
      setVisibleCount(10);
      setShowingRandom(true);
      return;
    }
    const meals = await searchMeals(searchQuery);
    const filtered = meals.filter((meal: any) =>
      meal.strMeal.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setAllMeals(filtered);
    setResults(filtered.slice(0, 10));
    setVisibleCount(10);
    setShowingRandom(false);
    Keyboard.dismiss();
  };

  const handleLoadMore = () => {
    const nextCount = visibleCount + 10;
    setVisibleCount(nextCount);
    setResults(allMeals.slice(0, nextCount));
  };

  const goToMealDetail = (idMeal: string) => {
    navigation.navigate('MealDetail', { idMeal });
  };
  
  const isMealFavorite = (meal: any) =>
    favorites.some((fav) => fav.idMeal === meal.idMeal);

  return (
    <ThemedView style={[styles.container, {backgroundColor: backgroundColor}]}>
      <ThemedView style={styles.searchWrapper}>
        <Ionicons name="search" size={20} color={ isFocused ? secondary : textColor} style={styles.icon} />
        <ThemedInput
          placeholder="Buscar recetas..."
          style={[styles.searchInput, isFocused && { borderColor: secondary}]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </ThemedView>

      <FlatList
        data={results}
        keyExtractor={(item) => `meal-${item.idMeal}`}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => goToMealDetail(item.idMeal)}
            isFavorite={isMealFavorite(item)}
            onToggleFavorite={() => toggleFavorite(item)}
            style={{width: 360}}
            />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay resultados</Text>}
        contentContainerStyle={results.length === 0 ? styles.emptyContainer : undefined}
      />
      {results.length > 0 && results.length < allMeals.length && (
        <TouchableOpacity onPress={handleLoadMore} style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Ver más</Text>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    width: 250,
    outlineWidth: 0,
  },
  searchWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    elevation: 3,
  },
  icon: {
    marginRight: 8,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreButton: {
    marginTop: 16,
    marginBottom: 32,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});