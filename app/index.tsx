import React from 'react'

import { Centered } from '@/components/lib/base'
import FormLogin from '@/components/app/FormLogin'
import { useAuth } from '@/components/lib/config'

export default function Home() {
  useAuth({ role: 'guest' })

  return (
    <Centered sty="p-3">
      <FormLogin />
    </Centered>
  )
}
