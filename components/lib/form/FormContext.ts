import { createContext } from 'react'

export type FormContextType = {
  disabled: boolean
}

export default createContext<FormContextType>({
  disabled: false,
})
