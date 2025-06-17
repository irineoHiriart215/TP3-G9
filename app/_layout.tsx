import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { FavoritesProvider } from '../context/FavoritesContext';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { ThemeProvider as AppThemeProvider, useThemeContext } from '@/context/ThemeContext';
import { MyDarkTheme, MyLightTheme } from '@/navigation/theme';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <AuthProvider>
      <FavoritesProvider>
        <AppThemeProvider>
          <RootLayoutWithTheme />
        </AppThemeProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

function RootLayoutWithTheme() {
  const { theme } = useThemeContext();

  return (
    <NavigationThemeProvider value={theme === 'dark' ? MyDarkTheme : MyLightTheme}> 
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="login" />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}
