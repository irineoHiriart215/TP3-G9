import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Search from '../app/(tabs)/search';
import MealDetail from '../app/MealDetail';
import { SearchStackParamList } from '@/types/navigation';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<SearchStackParamList>();

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ title: 'Buscar Recetas' }}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetail}
        options={{ title: 'Detalle Receta' }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: themeColors.background, borderTopWidth: 0 },
          tabBarActiveTintColor: themeColors.tint,
          tabBarInactiveTintColor: themeColors.tabIconDefault,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'search';

            if ( route.name === 'SearchTab') {
              iconName = focused ? 'search' : 'search-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="SearchTab" component={SearchStack} options={{ title: 'Buscar' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
