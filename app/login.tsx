// login.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Link, router } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import PrimaryButton from '@/components/PrimaryButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedInput } from '@/components/ThemedInput';


export default function Login() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<View style={{ flex: 1 }} />}
      >
        <MaterialCommunityIcons
          name="chef-hat"
          size={64}
          color="#4CAF50"
          style={{ alignSelf: 'center', marginBottom: 16 }}
        />
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Bienvenido a Foodie App.</ThemedText>
          </ThemedView>
            <ThemedText type="subtitle" style={{textAlign: 'center'}}>¿No sabes que cocinar?</ThemedText>
            <ThemedText type="subtitle" style={{marginBottom: 20, textAlign: 'center'}}>¡Estas en el lugar correcto!</ThemedText>

            <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle">Paso 1: Inicia sesion.</ThemedText>
              <ThemedText>Si no tienes una cuenta, registrate haciendo<ThemedText type="defaultSemiBold"><Link href='/register'> click aca. </Link></ThemedText></ThemedText>

              <ThemedText type="subtitle">Paso 2: Explora nuestras recetas</ThemedText>
              <ThemedText>Descubre miles de recetas y selecciona la que mas te guste.</ThemedText>

              <ThemedText type="subtitle">Paso 3: ¡Manos a la obra!</ThemedText>
              <ThemedText>Sigue el paso a paso y disfruta preparando tus platos preferidos.</ThemedText>
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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
   container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
  backgroundColor: '#1d3d47',
  borderRadius: 10,
  padding: 10,
  color: '#fff',
  borderColor: '#3e6e7f',
  borderWidth: 1,
  marginVertical: 8,
}
});
