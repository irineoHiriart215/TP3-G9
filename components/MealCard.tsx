import React from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';

type MealCardProps = {
  meal: any;
  onPress?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  style?: object;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, onPress, isFavorite = false, onToggleFavorite, style }) => {
  const textColor = useThemeColor({},'text');
  const primary = useThemeColor({}, 'primary');
  const secondary = useThemeColor({}, 'secondary');
  const card = useThemeColor({}, 'card')
  return (
    <TouchableOpacity style={[styles.card,{ backgroundColor: card}, style]} onPress={onPress}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, {color: textColor}]} numberOfLines={2}>{meal.strMeal}</Text>
        <Text style={[styles.subtitle, {color: textColor}]}>{meal.strCategory} · {meal.strArea}</Text>
      </View>
      {onToggleFavorite && (
        <Pressable onPress={onToggleFavorite} style={styles.favoriteButton}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart'}
            size={24}
            color={isFavorite ? secondary : primary }
           />
        </Pressable>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 6,
    borderRadius: 20,
    bottom: 2,
  },
  favoriteText: {
    fontSize: 24,
  },
  favActive: {
    color: 'red',
  },
  favInactive: {
    color: 'white',
  },
});
