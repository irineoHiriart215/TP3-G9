import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type IngredientCardProps = {
  ingredient: any;
  onPress?: () => void;
  style?: object;
};

export const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onPress, style }) => {
  const textColor = useThemeColor({}, 'text');
  const card = useThemeColor({}, 'card');

  const imageUrl = `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`;

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: card }, style]} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
          {ingredient.strIngredient}
        </Text>
        {ingredient.strDescription ? (
          <Text style={[styles.subtitle, { color: textColor }]} numberOfLines={2}>
            {ingredient.strDescription}
          </Text>
        ) : (
          <Text style={[styles.subtitle, { color: textColor }]}>No description available.</Text>
        )}
      </View>
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
    height: 140,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
  },
});
