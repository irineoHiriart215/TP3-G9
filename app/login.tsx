// login.tsx
import React from 'react';
import { StyleSheet} from 'react-native';
import { Link, router } from 'expo-router';
import NoLoggedView from '@/components/NoLooggedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import PrimaryButton from '@/components/PrimaryButton';
import { ThemedInput } from '@/components/ThemedInput';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function Login() {
  const primaryColor = useThemeColor({}, 'primary');
  const cardColor = useThemeColor({}, 'card');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  return (
    <NoLoggedView
      title ='Bienvenido a FoddieApp.'
      subtitle='¿No sabes que cocinar? Estas en el lugar correcto'
      scrollable= {false}
      >
       <ThemedView style={[styles.wrapper,{ backgroundColor : backgroundColor }]}>
        <ThemedView style={[styles.card, { backgroundColor: cardColor }]}>
          <ThemedText type="subtitle" style={styles.cardTitle}>¿Cómo funciona?</ThemedText>
          <ThemedText><TextHighlight>Paso 1:</TextHighlight> Inicia sesión o crea una cuenta. Si no tienes una cuenta, registrate haciendo{' '}
            <Link href='/register'>
              <ThemedText type="defaultSemiBold" style={{ color: textColor }}>click acá</ThemedText>
            </Link>.
          </ThemedText>
          <ThemedText><TextHighlight>Paso 2:</TextHighlight> Explora cientos de recetas diseñadas para vos.</ThemedText>
          <ThemedText><TextHighlight>Paso 3:</TextHighlight> ¡A cocinar! Seguí el paso a paso y disfrutá.</ThemedText>
        </ThemedView>

        <ThemedView style={styles.container}>
              <ThemedInput
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <ThemedInput
                placeholder="Contraseña"
                secureTextEntry
              />
              <PrimaryButton title="Iniciar Sesion" onPress={() => router.push('/(tabs)/home')}/>
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
