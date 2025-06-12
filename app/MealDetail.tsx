import { getMealById } from '@/api/mealdb';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/ThemedView';

export default function MealDetail() {
  const route = useRoute();
  const { idMeal } = route.params as { idMeal: string };
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({},'text');
  const primary = useThemeColor({}, 'primary');
  const secondary = useThemeColor({}, 'secondary');

  const [meal, setMeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMeal = async () => {
      const data = await getMealById(idMeal);
      setMeal(data);
      setLoading(false);
    };
    loadMeal();
  }, [idMeal]);

  if (loading)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#61dafb" />
      </View>
    );

  if (!meal)
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Receta no encontrada.</Text>
      </View>
    );

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
    }
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor: backgroundColor}]}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

      <Text style={[styles.title,{color: textColor}]}>{meal.strMeal}</Text>

      <ThemedView style={styles.infoContainer}>
        <Text style={[styles.category,{backgroundColor: secondary}]}>{meal.strCategory}</Text>
        <Text style={[styles.area,{backgroundColor: secondary}]}>{meal.strArea}</Text>
      </ThemedView>

      <ThemedView style={[styles.card, {backgroundColor: primary}]}>
        <Text style={[styles.sectionTitle, {color: textColor, borderBottomColor: secondary}]}>Ingredientes</Text>
        <View>
          {ingredients.map((item, idx) => (
            <View key={idx} style={styles.ingredientItem}>
              <Ionicons name="checkmark-circle" size={20} color={secondary} />
              <Text style={[styles.ingredientText, {color: textColor}]}>{item}</Text>
            </View>
          ))}
        </View>
      </ThemedView>
      <ThemedView style={[styles.card, {backgroundColor: primary}]}>
        <Text style={[styles.sectionTitle, {color:textColor, borderBottomColor: secondary}]}>Instrucciones</Text>
        <Text style={[styles.instructions, {color: textColor}]}>{meal.strInstructions}</Text>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
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
  errorContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#00000088',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 24,
  },
  category: {
    fontSize: 18,
    color: '#bbb',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    overflow: 'hidden',
  },
  area: {
    fontSize: 18,
    color: '#bbb',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    borderBottomWidth: 2,
    paddingBottom: 6,
  },

  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientText: {
    marginLeft: 10,
    fontSize: 16,
  },
  instructions: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 26,
  },
});
