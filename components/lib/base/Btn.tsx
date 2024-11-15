import React, { ReactNode, useState, isValidElement } from 'react'
import { GestureResponderEvent, Pressable } from 'react-native'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import { Sty, Theme, useStyles } from '../../../styles'
import Text from './Text'
import FA from './FA'

const Btn = ({
  children,
  sty: btnSty,
  textSty,
  disabled = false,
  color = 'gray-100',
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
  let bg = '', tx = ''

  switch (variant) {
    case 'filled':
      bg = `bg-${color}${pressed ? ':highlight' : ''}`
      tx = `text-${color}:contrast`
      break
    case 'outline':
      bg = `border-primary border-1 ${pressed ? `bg-${color}` : ''}`
      tx = `text-${color}${pressed ? ':contrast' : ''}`
      break
    case 'tonal':
      bg = `bg-${color}${pressed ? '' : ':tonal'}`
      tx = `text-${color}${pressed ? ':contrast' : ''}`
      break
  }

  return (
    <Pressable
      style={sty`
        row align-items-center justify-content-center gap-2
        ${bg}
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
          sty={`text-${color}:contrast`}
        />
      )}
      {isValidElement(children)
        ? children
        : (
            <Text sty={sty`${tx} fw-bold ${textSty}`}>
              {children}
            </Text>
          )}
    </Pressable>
  )
}
export default Btn
