import React, { ComponentProps, ReactNode } from 'react'
import FormContext, { FormContextType } from './FormContext'
import { Formik, FormikConfig, FormikProps, FormikValues } from 'formik'
import { Schema } from 'yup'

const FormProvider = <V extends FormikValues>({
  children,
  schema,
  disabled = false,
  defaults,
  stored,
  onSubmit,
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
  onSubmit?: FormikConfig<V>['onSubmit']
}) => {
  const value: FormContextType = {
    disabled,
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={defaults}
      onSubmit={onSubmit ?? (async (values) => {

      })}
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
