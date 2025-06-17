import React, { Children, PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useThemeColor } from '@/hooks/useThemeColor';

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
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const ScrollRef = React.useRef<ScrollView>(null);

  let tabBarHeight = 0;
  try {
    tabBarHeight = useBottomTabBarHeight();
  } catch (e) {
    tabBarHeight = 0;
  }

  const Header = () =>
    (title || subtitle) && (
      <ThemedView style={styles.header}>
        {title && <Text style={[styles.title, { color: textColor }]}>{title}</Text>}
        {subtitle && <Text style={[styles.subtitle, { color: textColor }]}>{subtitle}</Text>}
      </ThemedView>
    );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      {scrollable ? (
        <ScrollView
          ref={ScrollRef}
          style={[styles.flex, { backgroundColor }]}
          contentContainerStyle={[
            styles.content,
            scrollable && { paddingBottom: tabBarHeight + 20 },
          ]}
        >
          <Header />
          {children}
        </ScrollView>
      ) : (
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
