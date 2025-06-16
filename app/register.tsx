import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !repeatPassword) {
      setError('Todos los campos tienen que estar completos');
      return;
    }
    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden')
      return;
    }

    try {
      await register(name, email, password);
      router.replace('/(tabs)/home');
      setError('');
    } catch (error: any) {
      setError(error.message || 'Error al registrarse');
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
      
      {error ? (
        <ThemedText style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
          {error}
        </ThemedText>
      ) : null}

      <ThemedView style={styles.stepContainer}>
        <ThemedText>Nombre completo</ThemedText>
        <ThemedInput placeholder="Ej.: Juan Perez" value={name} onChangeText={setName} />
        <ThemedText>Email</ThemedText>
        <ThemedInput placeholder="Ej.: ejemplo@ejemplo.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <ThemedText>Contraseña</ThemedText>
        <ThemedInput placeholder="Ej.: juan123" value={password} onChangeText={setPassword} secureTextEntry />
        <ThemedText>Confirmar contraseña</ThemedText>
        <ThemedInput placeholder="Ej.: juan123" value={repeatPassword} onChangeText={setRepeatPassword} secureTextEntry />
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
});
