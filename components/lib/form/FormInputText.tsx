import React, { ComponentProps } from 'react'
import useForm from './useForm'
import { TextInput } from '../base'

const FormInputText = ({
  name,
  ...props
}: {
  name: string
} & ComponentProps<typeof TextInput>) => {
  const { handleChange, handleBlur, getFieldMeta } = useForm()
  const { value } = getFieldMeta<string>(name)

  return (
    <TextInput
      onChangeText={handleChange(name)}
      onBlur={handleBlur(name)}
      value={value}
      {...props}
    />
  )
}

export default FormInputText
