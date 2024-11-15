import React, { ReactNode } from 'react'
import { Sty, useStyles } from '@/styles'
import View from '../View'

const Group = ({
  children,
  sty: style,
}: {
  children: ReactNode
  sty: Sty
}) => {
  const { sty } = useStyles()

  return (
    <View sty={sty` ${style}`}>
      {children}
    </View>
  )
}

export default Group
