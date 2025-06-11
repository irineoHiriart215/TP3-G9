import React from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type MealCardProps = {
  meal: any;
  onPress?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  style?: object;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, onPress, isFavorite = false, onToggleFavorite, style }) => {
  const backgroundColor = useThemeColor({}, 'card');
  const titleColor = useThemeColor({},'primary');
  const subtitleColor = useThemeColor({}, 'text');
  return (
    <TouchableOpacity style={[styles.card, {backgroundColor}, style]} onPress={onPress}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, {color: titleColor}]} numberOfLines={2}>{meal.strMeal}</Text>
        <Text style={[styles.subtitle, {color: titleColor}]}>{meal.strCategory} · {meal.strArea}</Text>
      </View>
      {onToggleFavorite && (
        <Pressable onPress={onToggleFavorite} style={styles.favoriteButton}>
          <Text style={[styles.favoriteText, isFavorite ? styles.favActive : styles.favInactive]}>
            {isFavorite ? '❤️' : '🤍'}
          </Text>
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
