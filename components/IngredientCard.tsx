import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

interface IngredientsCardProps {
  ingredient: Ingredient;
  isAvailable?: boolean;
  onToggleAvailable?: () => void;
}

export const IngredientCard = ({ ingredient, isAvailable = false, onToggleAvailable }: IngredientsCardProps) => {
  const background = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const secondary = useThemeColor({}, 'secondary');
  
  return (
    <View style={[styles.card, { backgroundColor: background }]}>
      {/* Estrella en esquina */}
      {onToggleAvailable && (
        <TouchableOpacity style={styles.starIcon} onPress={onToggleAvailable}>
          <Ionicons
            name={isAvailable ? "star" : "star-outline"}
            size={24}
            color={textColor}
          />
        </TouchableOpacity>
      )}
      
      <Text style={[styles.name, { color: textColor }]}>
        {ingredient.strIngredient}
      </Text>
      {ingredient.strType ? (
        <Text style={[styles.description, { color: textColor }]}>
          {ingredient.strType}
        </Text>
      ) : (
        <Text style={[styles.description, { color: textColor, fontStyle: 'italic' }]}>
          Sin tipo disponible.
        </Text>
      )}
      {ingredient.strDescription ? (
        <Text style={[styles.description, { color: textColor }]}>
          {ingredient.strDescription}
        </Text>
      ) : (
        <Text style={[styles.description, { color: textColor, fontStyle: 'italic' }]}>
          Sin descripción disponible.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
  },
  starIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
    zIndex: 1,
  },
});
