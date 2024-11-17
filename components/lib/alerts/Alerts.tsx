import React, { ReactNode, ComponentProps } from 'react'
import AlertsProvider from './AlertsProvider'
import AlertsStack from './AlertsStack'
import { Sty } from '@/styles'

const Alerts = ({
  children,
  sty,
  ...props
}: {
  children?: ReactNode
  sty?: Sty | Sty[]
} & ComponentProps<typeof AlertsProvider>) => {
  return (
    <AlertsProvider {...props}>
      <AlertsStack sty={sty} />
      {children}
    </AlertsProvider>
  )
}

export default Alerts
