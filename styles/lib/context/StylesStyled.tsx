import React, { ComponentType } from 'react'
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native'

import useStyles from './useStyles'
import { StyParam } from './helpers'

const StylesStyled = ({
  component: C,
  sty: styles,
  defaultSty: defaultStyles,
  ...props
}: {
  component: ComponentType<{
    style?: StyleProp<TextStyle | ViewStyle | ImageStyle>
  }>
  sty?: StyParam | StyParam[]
  defaultSty?: StyParam | StyParam[]
}) => {
  const { sty } = useStyles()
  const ss = [defaultStyles, styles]
    .flat()
    .filter(s => s !== undefined)

  return (
    <C
      {...props}
      {...(ss.length && { style: sty(...ss) })}
    />
  )
}

export default StylesStyled
