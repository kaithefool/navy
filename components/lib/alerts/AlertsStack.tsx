import React from 'react'
import useAlerts from './useAlerts'
import { View } from '../base'
import { Sty, useStyles } from '@/styles'
import Alert from './Alert'

const AlertsStack = ({
  sty: style,
}: {
  sty: Sty | Sty[]
}) => {
  const { sty } = useStyles()
  const { stack } = useAlerts()

  return (
    <View sty={sty`col g-2 ${style}`}>
      {stack.map(msg => (
        <Alert key={msg.id} {...msg} />
      ))}
    </View>
  )
}

export default AlertsStack
