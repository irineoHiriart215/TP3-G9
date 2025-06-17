import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

export const MyLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.background,
    text: Colors.light.text,
    primary: Colors.light.primary,
    card: Colors.light.card,
    border: Colors.light.border,
    notification: Colors.light.secondary,
  },
};

export const MyDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.dark.background,
    text: Colors.dark.text,
    primary: Colors.dark.primary,
    card: Colors.dark.card,
    border: Colors.dark.border,
    notification: Colors.dark.secondary,
  },
};
