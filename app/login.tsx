import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import NoLoggedView from '@/components/NoLooggedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import PrimaryButton from '@/components/PrimaryButton';
import { ThemedInput } from '@/components/ThemedInput';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const primaryColor = useThemeColor({}, 'primary');
  const cardColor = useThemeColor({}, 'card');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Por favor ingresá email y contraseña.');
    }

    try {
      await login(email, password);
      router.replace('/(tabs)/home'); // redirige a home si inicia sesión correctamente
    } catch (error: any) {
      Alert.alert('Error de inicio de sesión', error.message || 'Ocurrió un error');
    }
  };

  return (
    <NoLoggedView
      title="Bienvenido a FoddieApp."
      subtitle="¿No sabes que cocinar? Estás en el lugar correcto"
      scrollable={false}
    >
      <ThemedView style={[styles.wrapper, { backgroundColor }]}>
        <ThemedView style={[styles.card, { backgroundColor: cardColor }]}>
          <ThemedText type="subtitle" style={styles.cardTitle}>¿Cómo funciona?</ThemedText>
          <ThemedText><TextHighlight>Paso 1:</TextHighlight> Iniciá sesión o creá una cuenta. Si no tenés una cuenta, registrate haciendo{' '}
            <Link href="/register">
              <ThemedText type="defaultSemiBold" style={{ color: textColor }}>click acá</ThemedText>
            </Link>.
          </ThemedText>
          <ThemedText><TextHighlight>Paso 2:</TextHighlight> Explorá cientos de recetas diseñadas para vos.</ThemedText>
          <ThemedText><TextHighlight>Paso 3:</TextHighlight> ¡A cocinar! Seguí el paso a paso y disfrutá.</ThemedText>
        </ThemedView>

        <ThemedView style={styles.container}>
          <ThemedInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <ThemedInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <PrimaryButton title="Iniciar Sesión" onPress={handleLogin} />
        </ThemedView>
      </ThemedView>
    </NoLoggedView>
  );
}

function TextHighlight({ children }: { children: React.ReactNode }) {
  return (
    <ThemedText type="defaultSemiBold" style={{ fontSize: 16 }}>
      {children}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    gap: 12,
    marginTop: 24,
    padding: 16,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
});
