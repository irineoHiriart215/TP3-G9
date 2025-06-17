import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IngredientCard } from '@/components/IngredientCard';
import { ThemedText } from '@/components/ThemedText';
import { useAvailableIngredients } from '@/context/AvailableIngredientsContext';

export default function Ingredients() {
  const { availableIngredients, toggleIngredient, isAvailable } = useAvailableIngredients();

  return (
    <ParallaxScrollView title="Ingredientes guardados" scrollable>
      {availableIngredients.length === 0 ? (
        <ThemedText style={styles.emptyText}>No hay ingredientes guardados.</ThemedText>
      ) : (
        <FlatList
          data={availableIngredients}
          keyExtractor={(item) => item.idIngredient}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <IngredientCard
              ingredient={item}
              isAvailable={isAvailable(item)}
              onToggleAvailable={() => toggleIngredient(item)}
            />
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
  emptyText: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.6,
  },
});
