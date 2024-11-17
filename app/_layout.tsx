import 'expo-dev-client'
import React, { useEffect } from 'react'
import { Slot, SplashScreen } from 'expo-router'
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_600SemiBold,
} from '@expo-google-fonts/noto-sans'

import Styles from '@/styles'
import Config from '@/components/lib/config'
import { View } from '@/components/lib/base'

// Prevents SplashScreen from auto hiding while the fonts are loaded.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, err] = useFonts({
    NotoSans_400Regular,
    NotoSans_600SemiBold,
  })

  useEffect(() => {
    if (loaded || err) {
      SplashScreen.hideAsync()
    }
  }, [loaded, err])

  if (!loaded && !err) {
    return null
  }

  return (
    <Config>
      <Styles>
        <View sty="bg-body fill">
          <Slot />
        </View>
      </Styles>
    </Config>
  )
}
