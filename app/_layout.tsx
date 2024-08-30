import { Slot, SplashScreen } from "expo-router";
import { TamaguiProvider } from "@tamagui/core";
import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import config from "../tamagui.config";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, err] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

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