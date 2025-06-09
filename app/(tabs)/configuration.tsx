// (tabs)/index.tsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function Settings() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.profileContainer}>
        <View>
          <Image
          source={{}}
          style={styles.avatar}
        />
          <ThemedText type="title">Juan Pérez</ThemedText>
          <ThemedText type="default">juan.perez@email.com</ThemedText>
        </View>
      </View>

      <View style={styles.section}>
        <SettingsItem icon="moon" text="Tema: Claro / Oscuro" />
        <SettingsItem icon="notifications" text="Notificaciones" />
        <SettingsItem icon="language" text="Idioma: Español" />
      </View>

      <View style={styles.section}>
        <SettingsItem icon="help-circle" text="Centro de ayuda" />
        <SettingsItem icon="mail" text="Contacto" />
        <SettingsItem icon="log-out" text="Cerrar sesión" />
      </View>
    </ThemedView>
  );
}

function SettingsItem({ icon, text }: { icon: any; text: string }) {
  return (
    <TouchableOpacity style={styles.item}>
      <Ionicons name={icon} size={20} color="#555" style={styles.itemIcon} />
      <ThemedText style={styles.itemText}>{text}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
    gap: 24,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 30,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  section: {
    gap: 16,
    marginBottom: 30,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
  },
});
