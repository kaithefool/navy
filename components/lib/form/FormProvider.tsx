import React, { ReactNode } from 'react'
import { Formik, FormikConfig, FormikProps, FormikValues } from 'formik'
import { Schema } from 'yup'
import FormContext, { FormContextType } from './FormContext'
import useHttp, { HttpRequest, HttpResponse } from '../hooks/useHttp'

const FormProvider = <V extends FormikValues>({
  children,
  schema,
  disabled = false,
  defaults,
  stored = {},
  onSubmit,
  onSubmitted = () => {},
  api,
  reset = false,
  ...props
}: {
  children: ReactNode | ((
    formikProps: FormikProps<V>,
    formProps: FormContextType,
  ) => ReactNode)
  schema?: Schema
  disabled?: boolean
  defaults: V
  stored?: Partial<V>
  onSubmit?: FormikConfig<V>['onSubmit']
  onSubmitted?: (res: HttpResponse) => void
  api?: HttpRequest | ((values: V) => HttpRequest)
  reset?: boolean
}) => {
  const http = useHttp()
  const value: FormContextType = {
    disabled,
    http,
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={defaults}
      onSubmit={onSubmit ?? (async (values, { resetForm }) => {
        if (api) {
          const res = await http.req(
            {
              method: 'post',
              body: JSON.stringify(values),
              ...typeof api === 'function'
                ? api(values)
                : api,
            },
          )

          onSubmitted(res)
          resetForm(reset ? undefined : { values })
        }
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
