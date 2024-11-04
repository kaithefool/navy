import React, { ReactNode, useState } from 'react'
import ConfigContext, { ConfigContextType, Auth } from './ConfigContext'

const ConfigProvider = ({ children }: {
  children: ReactNode | ((value: ConfigContextType) => ReactNode)
}) => {
  const [auth, setAuth] = useState<Auth>()

  const value: ConfigContextType = {
    api: 'http://localhost:3000/api/a',
    auth,
    setAuth,
  }

  return (
    <ConfigContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </ConfigContext.Provider>
  )
}

export default ConfigProvider
