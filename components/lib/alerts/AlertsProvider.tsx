import React, { ReactNode, useId, useState } from 'react'
import AlertsContext, { AlertsContextType } from './AlertsContext'
import AlertsStack from './AlertsStack'
import Alert from './Alert'

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
        { ...msg, id: useId() },
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

AlertsProvider.Stack = AlertsStack
AlertsProvider.Alert = Alert

export default AlertsProvider
