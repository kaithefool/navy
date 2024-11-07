import React from 'react'

import { Centered } from '@/components/lib/base'
import FormLogin from '@/components/app/FormLogin'
import { router } from 'expo-router'

export default function Home() {
  return (
    <Centered sty="p-3">
      <FormLogin
        onLoggedIn={() => router.navigate('/protected')}
      />
    </Centered>
  )
}
