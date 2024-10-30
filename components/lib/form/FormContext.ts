import { createContext } from 'react'
import useHttp from '../hooks/useHttp'

export type FormContextType = {
  disabled: boolean
  http: ReturnType<typeof useHttp> | null
}

export default createContext<FormContextType>({
  disabled: false,
  http: null,
})
