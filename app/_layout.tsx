import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { Slot, SplashScreen } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  NotoSans_400Regular as notoSans400,
} from '@expo-google-fonts/noto-sans';

import { getNavTheme } from '../styles';

// Prevents SplashScreen from auto hiding while the fonts are loaded.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light',
    [loaded, err] = useFonts({ notoSans400 });

  useEffect(() => {
    if (loaded || err) {
      SplashScreen.hideAsync();
    }
  }, [loaded, err]);

  if (!loaded && !err) {
    return null;
  }

  return (
    <ThemeProvider value={getNavTheme(colorScheme)}>
      <SafeAreaView>
        <Slot />
      </SafeAreaView>
    </ThemeProvider>
  );
}