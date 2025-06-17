import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { getAllIngredients } from '../../api/mealdb';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Ingredients() {
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const data = await getAllIngredients();
        setIngredients(data);
      } catch (error) {
        console.error('Error al cargar ingredientes', error);
      } finally {
        setLoading(false);
      }
    };

    loadIngredients();
  }, []);

  return (
    <ParallaxScrollView title="Ingredientes" scrollable>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={ingredients}
          keyExtractor={(item) => item.idIngredient}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <ThemedView style={styles.ingredientItem}>
              <ThemedText>{item.strIngredient}</ThemedText>
              {item.strDescription ? (
                <ThemedText style={styles.ingredientDesc}>
                  {item.strDescription.slice(0, 100)}...
                </ThemedText>
              ) : null}
            </ThemedView>
          )}
        />
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  ingredientItem: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  ingredientDesc: {
    marginTop: 4,
    fontSize: 12,
    opacity: 0.6,
  },
});
