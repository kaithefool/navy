import React, { useEffect } from 'react';
import { Slot, SplashScreen } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_600SemiBold,
} from '@expo-google-fonts/noto-sans';

import Styles from '../styles';

// Prevents SplashScreen from auto hiding while the fonts are loaded.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, err] = useFonts({
    NotoSans_400Regular,
    NotoSans_600SemiBold,
  });

  useEffect(() => {
    if (loaded || err) {
      SplashScreen.hideAsync();
    }
  }, [loaded, err]);

  if (!loaded && !err) {
    return null;
  }

  return (
    <Styles>
      <SafeAreaView>
        <Slot />
      </SafeAreaView>
    </Styles>
  );
}