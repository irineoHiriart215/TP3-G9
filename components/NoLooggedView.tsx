import React, { Children, PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
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
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const ScrollRef = React.useRef<ScrollView>(null);

  const Header = () => (
    (title || subtitle) && (
       <ThemedView style={styles.header}>
        {title && <Text style={[styles.title, {color: textColor}]}>{title}</Text>}
        {subtitle && <Text style={[styles.subtitle, {color: textColor}]}>{subtitle}</Text>}
      </ThemedView>
    )
  )

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: backgroundColor}]}>
      {scrollable ? (
        <ScrollView
          ref={ScrollRef}
          style={styles.flex}
          contentContainerStyle={[
            styles.content,
            scrollable && { paddingBottom:20},
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
    paddingHorizontal: 24,
    paddingTop: 24,
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
    marginTop: 4,
  },
});
