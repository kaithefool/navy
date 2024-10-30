import { useContext } from 'react'
import FormContext from './FormContext'
import { useFormikContext } from 'formik'

export default function useForm() {
  return {
    ...useFormikContext(),
    ...useContext(FormContext),
  }
}
