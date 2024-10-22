import React from 'react'
import { View as NativeView, ViewProps } from 'react-native'
import { Sty, useStyles } from '../../styles'

const View = ({
  sty: styles, ...props
}: { sty: Sty | Sty[] } & ViewProps) => {
  const { sty } = useStyles()

  return (
    <NativeView
      {...props}
      style={sty(styles)}
    />
  )
}

export default View
