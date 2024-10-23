import React, { ComponentProps } from 'react'
import useForm from './useForm'
import { Btn } from '../base'

const FormBtnSubmit = (props: ComponentProps<typeof Btn>) => {
  const { handleSubmit, values } = useForm()

  console.log(values)

  return (
    <Btn
      onPress={() => handleSubmit()}
      {...props}
    />
  )
}

export default FormBtnSubmit
