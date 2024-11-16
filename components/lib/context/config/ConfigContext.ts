import { createContext } from 'react'

export type Auth = {
  access: string
  refresh: string
  user: {
    lng?: string
    role?: string
  }
} | null

export type ConfigContextType = {
  api: string
  auth: Auth
  setAuth: (auth: Auth) => void
}

export default createContext<ConfigContextType>({
  api: '',
  auth: null,
  setAuth: () => null,
})
