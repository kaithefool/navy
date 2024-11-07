import React, { ReactNode } from 'react'
import View from './View'
import { Sty } from '@/styles'

const Centered = ({
  children,
  sty,
}: {
  children: ReactNode
  sty?: Sty | Sty[]
}) => {
  return (
    <View sty="row align-items-center justify-content-center mih-100">
      <View sty={`w-100 ${sty}`}>
        {children}
      </View>
    </View>
  )
}

export default Centered
