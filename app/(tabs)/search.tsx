// (tabs)/index.tsx
import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { ThemedInput } from '@/components/ThemedInput';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchWrapper}>
        <Ionicons name="search" size={20} color="#888" style={styles.icon} />
        <ThemedInput
          placeholder="Buscar recetas..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1
  },
  searchWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    elevation: 3,
  },
  icon: {
    marginRight: 8,
  },
});
