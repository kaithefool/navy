import React, { useState } from 'react'
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInput as NativeTextInput,
  TextInputProps,
} from 'react-native'
import { Sty, Theme, useStyles } from '../../../styles'

const TextInput = ({
  sty: styles,
  size = 'md',
  onFocus = () => {},
  onBlur = () => {},
  ...props
}: {
  sty?: Sty | Sty[]
  size?: keyof Theme.ThemeConfig['textInputSizes']
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
} & TextInputProps) => {
  const { sty, theme } = useStyles()
  const { textInputSizes, textInputRadius } = theme.config
  const [focused, setFocused] = useState<boolean>(false)

  return (
    <NativeTextInput
      style={sty`
        text
        border-1 border-gray-300
        ${focused && 'border-primary'}
        ${textInputSizes[size]}
        ${{ borderRadius: textInputRadius }}
        ${styles}
      `}
      onFocus={(e) => {
        setFocused(true)
        onFocus(e)
      }}
      onBlur={(e) => {
        setFocused(false)
        onBlur(e)
      }}
      {...props}
    />
  )
}

export default TextInput
