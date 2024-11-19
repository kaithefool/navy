import React from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import useAlerts from './useAlerts'
import { AlertMsg } from './AlertsContext'
import { Btn, Text, View } from '../base'
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
      w-100 row g-2 px-2 py-1
      align-items-center
      bg-${theme}:tonal
      rounded-3
    `}
    >
      {icon && (
        <FA icon={icon} sty={`text-${theme}-500`} />
      )}
      <Text sty={`grow-1 basis-0 text-${theme}-500`}>
        {body}
      </Text>
      <Btn
        icon={faTimes}
        size="sm"
        color={`${theme}-500`}
        variant="link"
        sty="px-0"
        onPress={() => remove(id)}
      />
    </View>
  )
}

export default Alert
