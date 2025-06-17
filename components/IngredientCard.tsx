import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import Ingredients from "@/app/(tabs)/ingredients";

interface IngredientsCardProps {
    ingredient: {
        idIngredient: string;
        strIngredient: string;
        strDescription: string | null;
        strType: string | null;
    };
}

export const IngredientCard = ({ ingredient }: IngredientsCardProps) => {
    const background = useThemeColor({}, 'card');
    const textColor = useThemeColor({}, 'text');
    const secondary = useThemeColor({}, 'secondary');
    console.log("Rendering ingredient:", ingredient);
    
    return (

    <View style={[styles.card, { backgroundColor: background }]}>
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
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
  },
});