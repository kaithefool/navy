import React from 'react'
import { Text as NativeText, TextProps } from 'react-native'
import { Sty, useStyles } from '../../../styles'

const Text = ({
  sty: styles, ...props
}: {
  sty?: Sty | Sty[]
} & TextProps) => {
  const { sty } = useStyles()

  return (
    <NativeText
      {...props}
      style={sty`text ${styles}`}
    />
  )
}

export default Text
