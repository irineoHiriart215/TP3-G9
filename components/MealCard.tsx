import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const MealCard = ({ meal, onPress }: { meal: any; onPress?: () => void }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{meal.strMeal}</Text>
        <Text style={styles.subtitle}>{meal.strCategory} · {meal.strArea}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 10,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
  },
});
