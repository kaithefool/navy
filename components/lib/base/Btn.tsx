import React, { ReactNode, useState, isValidElement } from 'react'
import { GestureResponderEvent, Pressable } from 'react-native'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import { Sty, Theme, useStyles } from '../../../styles'
import Text from './Text'
import { FontAwesomeIcon as FA } from '@fortawesome/react-native-fontawesome'
import { faD } from '@fortawesome/free-solid-svg-icons'

const Btn = ({
  children,
  sty: btnSty,
  textSty,
  disabled = false,
  color = 'gray-200',
  icon,
  variant = 'filled',
  size = 'md',
  onPress = () => {},
  onPressIn = () => {},
  onPressOut = () => {},
  ...props
}: {
  children?: ReactNode
  sty?: Sty | Sty[]
  textSty?: Sty | Sty[]
  disabled?: boolean
  color?: string
  variant?: 'filled' | 'tonal' | 'outline'
  icon?: IconDefinition
  size?: keyof Theme.ThemeConfig['btnSizes']

  onPress?: (e: GestureResponderEvent) => void
  onPressIn?: (e: GestureResponderEvent) => void
  onPressOut?: (e: GestureResponderEvent) => void
}) => {
  const { sty, theme } = useStyles()
  const [pressed, setPressed] = useState<boolean>(false)
  const { btnSizes, btnRadius } = theme.config

  const a = sty`
  row align-items-center justify-content-center gap-2
  bg-${color}${pressed && ':highlight'}
  ${btnSizes[size]} ${{ borderRadius: btnRadius }}
  ${disabled && { opacity: 0.65 }}
`

  sty({ overflow: 'scroll' })

  return (
    <Pressable
      style={sty`
        row align-items-center justify-content-center gap-2
        bg-${color}${pressed && ':highlight'}
        ${btnSizes[size]} ${{ borderRadius: btnRadius }}
        ${disabled && { opacity: 0.65 }}
        ${btnSty}
      `}
      onPress={e => !disabled && onPress(e)}
      onPressIn={(e) => {
        if (!disabled) {
          setPressed(true)
          onPressIn(e)
        }
      }}
      onPressOut={(e) => {
        if (!disabled) {
          setPressed(false)
          onPressOut(e)
        }
      }}
      {...props}
    >
      {icon && (
        <FA
          icon={icon}
          style={sty`text-${color}:contrast`}
        />
      )}
      {isValidElement(children)
        ? children
        : (
            <Text sty={sty`text-${color}:contrast fw-bold ${textSty}`}>
              {children}
            </Text>
          )}
    </Pressable>
  )
}

export default Btn
