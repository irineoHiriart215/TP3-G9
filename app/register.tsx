// (tabs)/index.tsx
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import PrimaryButton from '@/components/PrimaryButton';
import { ThemedInput } from '@/components/ThemedInput';


export default function Register() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<View style={{ flex: 1 }} />}
     >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Registro</ThemedText>
          </ThemedView>
              <ThemedView style={styles.stepContainer}>
                <ThemedInput
                  placeholder="Nombre Completo"
                  autoCapitalize="none"
                />
                <ThemedInput
                  placeholder="Email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <ThemedInput
                  placeholder="Nombre de Usuario"
                  autoCapitalize="none"
                />
                <ThemedInput
                  placeholder="Contraseña"
                  autoCapitalize="none"
                  secureTextEntry
                />
                <ThemedInput
                  placeholder="Repetir Contraseña"
                  autoCapitalize="none"
                  secureTextEntry
                />
                <PrimaryButton title="Registrarme" onPress={() => router.push('/login')}/>
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
   container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
},
 button: {
  backgroundColor: '#1d3d47',
  borderRadius: 10,
  padding: 12,
  alignItems: 'center',
  marginTop: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
