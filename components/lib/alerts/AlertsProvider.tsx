import React, { ReactNode, useState } from 'react'
import AlertsContext, { AlertsContextType } from './AlertsContext'
import uniqueId from 'lodash/uniqueId'

const AlertsProvider = ({
  children,
  limit = 3,
}: {
  children: ReactNode | ((value: AlertsContextType) => ReactNode)
  limit?: number
}) => {
  const [stack, setStack] = useState<AlertsContextType['stack']>([])

  const value: AlertsContextType = {
    stack,
    push: (msg) => {
      setStack([
        ...stack,
        { ...msg, id: uniqueId() },
      ].slice(-limit))
    },
    purge: () => {
      setStack(stack.filter(msg => !msg.dirty))
    },
    remove: (id) => {
      setStack(stack.filter(msg => msg.id !== id))
    },
  }

  return (
    <AlertsContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </AlertsContext.Provider>
  )
}

export default AlertsProvider
