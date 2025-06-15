import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import PrimaryButton from '@/components/PrimaryButton';
import { ThemedInput } from '@/components/ThemedInput';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useAuth } from '@/context/AuthContext';

export default function Register() {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !repeatPassword) {
      return Alert.alert('Error', 'Completa todos los campos.');
    }
    if (password !== repeatPassword) {
      return Alert.alert('Error', 'Las contraseñas no coinciden.');
    }

    try {
      await register(name, email, password);
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Error al registrarse', error.message || 'Ocurrió un error.');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<View style={{ flex: 1 }} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Registro</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedInput placeholder="Nombre Completo" value={name} onChangeText={setName} />
        <ThemedInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <ThemedInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        <ThemedInput placeholder="Repetir Contraseña" value={repeatPassword} onChangeText={setRepeatPassword} secureTextEntry />
        <PrimaryButton title="Registrarme" onPress={handleRegister} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
