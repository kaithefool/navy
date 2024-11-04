import { createContext } from 'react'

export type Auth = {
  access: string
  refresh: string
  user: {
    lng: string
  }
}

export type ConfigContextType = {
  api: string
  auth?: Auth
  setAuth: (auth: Auth) => void
}

export default createContext<ConfigContextType>({
  api: '',
  setAuth: () => {},
})
