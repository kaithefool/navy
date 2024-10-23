import React, { ComponentProps } from 'react'
import FormProvider from './FormProvider'
import FormInputText from './FormInputText'
import FormBtnSubmit from './FormBtnSubmit'

const Form = (props: ComponentProps<typeof FormProvider>) => {
  return (
    <FormProvider {...props} />
  )
}

Form.InputText = FormInputText
Form.BtnSubmit = FormBtnSubmit

export default Form
