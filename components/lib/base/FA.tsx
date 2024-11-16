import React from 'react'
import {
  FontAwesomeIcon,
  Props as FontAwesomeProps,
} from '@fortawesome/react-native-fontawesome'
import { Sty, useStyles } from '@/styles'

const FA = ({
  sty: style,
  ...props
}: {
  sty?: Sty | Sty[]
} & FontAwesomeProps) => {
  const { sty } = useStyles()
  const s = sty(style)

  if ('color' in s && typeof s.color !== 'string') {
    s.color = s.color?.toString()
  }

  return (
    <FontAwesomeIcon
      style={s}
      {...props}
    />
  )
}

export default FA
