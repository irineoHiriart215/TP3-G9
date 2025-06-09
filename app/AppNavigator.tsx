import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Search from '../app/(tabs)/search';
import MealDetail from '../app/MealDetail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#121212' }, // color sólido oscuro para tab bar
        }}
      >
        <Tab.Screen name="SearchTab" component={SearchStack} options={{ title: 'Buscar' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
