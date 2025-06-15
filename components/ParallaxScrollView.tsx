import React, { Children, PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Colors } from '@/constants/Colors'; 

type Props = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  scrollable?: boolean;
}>;

export default function ParallaxScrollView({
  title,
  subtitle,
  scrollable = true,
  children,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const ScrollRef = React.useRef<ScrollView>(null);
  let tabBarHeight = 0;
  try {
    tabBarHeight = useBottomTabBarHeight();
  } catch (e) {
    tabBarHeight = 0; // fallback si no está dentro del tab navigator
  }


  const Header = () => (
    (title || subtitle) && (
       <ThemedView style={styles.header}>
        {title && <Text style={[styles.title, {color: colors.text}]}>{title}</Text>}
        {subtitle && <Text style={[styles.subtitle, {color: colors.text}]}>{subtitle}</Text>}
      </ThemedView>
    )
  )

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: colors.background}]}>
      {scrollable ? (
        <ScrollView
          ref={ScrollRef}
          style={styles.flex}
          contentContainerStyle={[
            styles.content,
            scrollable && { paddingBottom: tabBarHeight +20},
          ]}
        >
          <Header />
          { children }
        </ScrollView>
      ):(
        <ThemedView style={[styles.flex, styles.content]}>
        <Header />
        {children}
      </ThemedView>
      )}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 2,
  },
});
