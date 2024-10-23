import React, { ReactNode } from 'react'
import FormContext, { FormContextType } from './FormContext'
import { Formik, FormikProps, FormikValues } from 'formik'
import { Schema } from 'yup'

const FormProvider = <V extends FormikValues>({
  children,
  schema,
  disabled = false,
  defaults,
  stored,
  ...props
}: {
  children: ReactNode | ((
    formikProps: FormikProps<V>,
    formProps: FormContextType,
  ) => ReactNode)
  schema?: Schema
  disabled?: boolean
  defaults: V
  stored?: object
}) => {
  const value: FormContextType = {
    disabled,
  }

  const submitHandler = () => {
    console.log('submit')
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={defaults}
      onSubmit={submitHandler}
      {...props}
    >
      {formikProps => (
        <FormContext.Provider value={value}>
          {
            typeof children === 'function'
              ? children(formikProps, value)
              : children
          }
        </FormContext.Provider>
      )}
    </Formik>
  )
}

export default FormProvider
