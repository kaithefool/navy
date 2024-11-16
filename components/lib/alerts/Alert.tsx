import React from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import useAlerts from './useAlerts'
import { AlertMsg } from './AlertsContext'
import { Btn, View } from '../base'
import FA from '../base/FA'

const Alert = ({
  id,
  theme,
  icon,
  body,
}: AlertMsg) => {
  const { remove } = useAlerts()

  return (
    <View sty={`
      row g-2 align-items-center px-2 py-1
      bg-{theme}:tonal
      rounded-3
    `}
    >
      {icon && (
        <FA icon={icon} sty={`text-${theme}-500`} />
      )}
      {body}
      <Btn
        icon={faTimes}
        size="sm"
        onPress={() => remove(id)}
      />
    </View>
  )
}

export default Alert
