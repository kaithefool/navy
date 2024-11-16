import { useEffect } from 'react'
import { router } from 'expo-router'
import useConfig from './useConfig'
import { Auth } from './ConfigContext'

export type AuthGuard = {
  role?: 'guest' | string
  redirect?: string
} | boolean

export default function useAuth(guard: AuthGuard = false) {
  const { auth, setAuth } = useConfig()

  useEffect(() => {
    if (guard) {
      const g = guard === true ? {} : guard

      if (g.role === 'guest') {
        if (auth) router.navigate('/protected')
      }
      else {
        if (!auth || (g.role && g.role !== auth.user.role)) {
          router.navigate('/')
        }
      }
    }
  }, [!!auth])

  return {
    auth,
    login: (authPayload: Exclude<Auth, null>) => setAuth(authPayload),
    logout: () => setAuth(null),
  }
}
