import React from 'react'
import { Centered, Text } from '@/components/lib/base'

const ProtectedHome = () => {
  return (
    <Centered sty="p-3">
      <Text sty="h1 text-center">
        You're logged in.
      </Text>
    </Centered>
  )
}

export default ProtectedHome
