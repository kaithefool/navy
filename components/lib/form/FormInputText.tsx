import React from 'react'
import useForm from './useForm'
import { TextInput } from '../base'

const FormInputText = ({
  name,
  ...props
}: {
  name: string
}) => {
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
