import React, { ReactNode, useState, isValidElement } from 'react'
import { GestureResponderEvent, Pressable } from 'react-native'
import { Sty, Theme, useStyles } from '../../../styles'
import Text from './Text'

const Btn = ({
  children,
  sty: btnSty,
  textSty,
  disabled = false,
  color = 'primary',
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
  size?: keyof Theme.ThemeConfig['btnSizes']

  onPress?: (e: GestureResponderEvent) => void
  onPressIn?: (e: GestureResponderEvent) => void
  onPressOut?: (e: GestureResponderEvent) => void
}) => {
  const { sty, theme } = useStyles()
  const [pressed, setPressed] = useState<boolean>(false)
  const { btnSizes, btnRadius } = theme.config

  return (
    <Pressable
      style={sty`
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
      {isValidElement(children)
        ? children
        : (
            <Text sty={sty`
              text-center
              text-${color}:contrast fw-bold ${textSty}
            `}
            >
              {children}
            </Text>
          )}
    </Pressable>
  )
}

export default Btn
