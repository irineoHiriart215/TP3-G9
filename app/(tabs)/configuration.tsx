import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SettingsItem }  from '@/components/SettingsItem';
import { useAuth } from '@/context/AuthContext';
import { useThemeContext } from '@/context/ThemeContext'; 

export default function Settings() {
  const textColor = useThemeColor({}, 'text');
  const { user, logout } = useAuth();
  const { toggleTheme, theme } = useThemeContext();

  return (
    <ParallaxScrollView title="Configuración" scrollable={false}>
      <ThemedView style={styles.container}>
        <ThemedView style={[styles.profileContainer, { backgroundColor: useThemeColor({}, 'background') }]}>
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name ?? '')}`,
            }}
            style={styles.avatar}
          />
          <ThemedText type="title">{user?.name}</ThemedText>
          <ThemedText style={{ color: textColor }}>{user?.email}</ThemedText>
        </ThemedView>

        <View style={styles.section}>
          <SectionTitle title="Preferencias" />
          <SettingsItem icon="moon"
           text= {`Tema: ${theme === 'light' ? 'Claro' : 'Oscuro'}`}
           onPress={toggleTheme} />
          <SettingsItem icon="notifications" text="Notificaciones" />
          <SettingsItem icon="language" text="Idioma: Español" />
        </View>

        <View style={styles.section}>
          <SectionTitle title="Soporte y cuenta" />
          <SettingsItem icon="help-circle" text="Centro de ayuda" />
          <SettingsItem icon="mail" text="Contacto" />
          <SettingsItem icon="log-out" text="Cerrar sesión" danger onPress={logout}/>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

function SectionTitle({ title }: { title: string }) {
  const textColor = useThemeColor({}, 'text');
  return (
    <ThemedText style={[styles.sectionTitle, { color: textColor }]}>{title}</ThemedText>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 32,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    opacity: 0.8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
  },
});
