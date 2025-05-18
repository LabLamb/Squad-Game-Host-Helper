import { BigShouldersDisplay_400Regular, BigShouldersDisplay_700Bold } from '@expo-google-fonts/big-shoulders-display';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    BigShouldersDisplay_400Regular,
    BigShouldersDisplay_700Bold,
    'Bender-Regular': require('@/assets/fonts/Bender.otf'),
    'Bender-Bold': require('@/assets/fonts/Bender-Bold.otf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return <></>;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerTitle: '' }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
