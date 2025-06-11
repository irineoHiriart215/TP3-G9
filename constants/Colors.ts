/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#F6F6F6';
const tintColorDark = '#1C1C1C';

export const Colors = {
  light: {
    text: '#302A18',
    background: '#F6F6F6',
    tint: tintColorLight,
    card: '#FFF1DC',
    border: '#E0D7C6',
    icon: '#FDE4C3',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#FF7043',
  },
  dark: {
    text: '#FDE4C3',
    background: '#1C1C1C',
    tint: tintColorDark,
    card: '#2C2C2C',
    border: '#444',
    icon: '#302A18',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#FF7043',
  },
};
