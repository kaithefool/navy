import { createContext, ReactNode } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export type AlertMsg = {
  id: string
  theme: string
  icon?: IconProp
  body: ReactNode | string
  dirty?: boolean
  expiresAt?: Date
}

export type AlertsContextType = {
  stack: AlertMsg[]
  push: (msg: Omit<AlertMsg, 'id'>) => void
  purge: () => void
  remove: (id: AlertMsg['id']) => void
}

export default createContext<AlertsContextType>({
  stack: [],
  push: () => {},
  purge: () => {},
  remove: () => {},
})
