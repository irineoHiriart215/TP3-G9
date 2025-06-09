import { Redirect } from 'expo-router';

export default function Index() {
  // Redirige a una de tus pantallas, por ejemplo: home
  return <Redirect href="/(tabs)/home" />;
}
