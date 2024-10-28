import React, { ComponentProps } from 'react'
import useForm from './useForm'
import { Btn } from '../base'

const FormBtnSubmit = (props: ComponentProps<typeof Btn>) => {
  const { handleSubmit } = useForm()

  return (
    <Btn
      onPress={() => handleSubmit()}
      {...props}
    />
  )
}

export default FormBtnSubmit
