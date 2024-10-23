import { useContext } from 'react'
import FormContext from './FormContext'
import { useFormikContext } from 'formik'

export default function useForm() {
  return {
    ...useContext(FormContext),
    ...useFormikContext(),
  }
}
