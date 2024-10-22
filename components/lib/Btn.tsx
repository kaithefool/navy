import React, { ReactNode, useState, isValidElement } from 'react'
import { Pressable } from 'react-native'
import { Sty, Theme, useStyles } from '../../styles'
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
  children: ReactNode
  sty?: Sty | Sty[]
  textSty?: Sty | Sty[]
  disabled?: boolean
  color?: string
  variant?: 'filled' | 'tonal' | 'outline'
  size?: keyof Theme.ThemeConfig['btnSizes']

  onPress?: () => void
  onPressIn?: () => void
  onPressOut?: () => void
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
      onPress={() => !disabled && onPress()}
      onPressIn={() => !disabled && setPressed(true) && onPressIn()}
      onPressOut={() => !disabled && setPressed(true) && onPressOut()}
      {...props}
    >
      {isValidElement(children)
        ? children
        : (
            <Text sty={sty`
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
