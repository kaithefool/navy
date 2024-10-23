import React, { ComponentProps } from 'react'
import useForm from './useForm'
import { TextInput } from '../base'

const FormInputText = ({
  name,
  ...props
}: {
  name: string
} & ComponentProps<typeof TextInput>) => {
  const { handleChange, handleBlur } = useForm()

  return (
    <TextInput
      onChangeText={handleChange(name)}
      onBlur={handleBlur(name)}
      {...props}
    />
  )
}

export default FormInputText
