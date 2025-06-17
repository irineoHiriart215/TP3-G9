import { Colors } from '@/constants/Colors';
import { useThemeContext } from '@/context/ThemeContext';

type ThemeProps = {
  light?: string;
  dark?: string;
};

export function useThemeColor(
  props: ThemeProps,
  colorName: keyof typeof Colors.light
) {
  const { theme } = useThemeContext(); 
  const colorFromProps = props[theme];

  return colorFromProps ?? Colors[theme][colorName];
}
