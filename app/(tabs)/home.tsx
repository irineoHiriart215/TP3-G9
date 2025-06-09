// (tabs)/index.tsx
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Home() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<View style={{ flex: 1 }} />} 
      >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">🍽️ FoodieApp</ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.cardTitle}>Ultimas Recetas</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}></ScrollView>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.cardTitle}>Mis recetas Favoritas</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}></ScrollView>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.cardTitle}>Tendencias</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}></ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
  },
});
