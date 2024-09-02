import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { TamaguiProvider } from "@tamagui/core";

// fonts
import Inter from '@tamagui/font-inter/otf/Inter-Medium.otf';
import InterBold from '@tamagui/font-inter/otf/Inter-Bold.otf';

import config from "../tamagui.config";

// Prevents SplashScreen from auto hiding while the fonts are loaded.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme(),
    [loaded, err] = useFonts({ Inter, InterBold });

  useEffect(() => {
    if (loaded || err) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [loaded, err]);

  if (!loaded && !err) {
    return null;
  }

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme || undefined}>
      <Slot />
    </TamaguiProvider>
  );
}