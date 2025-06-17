/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#F6F6F6';

export const Colors = {
  light: {
    text: '#302A18',
    background: '#F4F4F5',
    tint: tintColorLight,
    card: '#FFF1DC',
    border: '#E0D7C6',
    icon: '#FDE4C3',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#FF7043',
    secondary: '#912B29',
    danger: 'red',
  },
  dark: {
    text: '#E3d5BB',
    background: '#1A2228',
    tint: '#E3d5BB', 
    card: '#912B29',
    border: '#912B29',
    icon: '#191E21',
    tabIconDefault: '#23262A',
    tabIconSelected: '#912B29',
    primary: '#191E21',
    secondary: '#912B29',
    danger: 'red',
  },
};
