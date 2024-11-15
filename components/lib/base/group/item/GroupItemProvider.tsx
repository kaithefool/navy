import React, { ReactNode } from 'react'
import GroupItemContext, { GroupItemContextType } from './GroupItemContext'
import { getGroupItemStyle } from '../helpers'

const GroupItemProvider = ({
  children,
  index,
  length,
  parentStyle,
}: {
  children: ReactNode | ((value: GroupItemContextType) => ReactNode)
  index: number
  length: number
  parentStyle: GroupItemContextType['parentStyle']
}) => {
  const first = index === 0
  const last = index === length - 1

  const value: GroupItemContextType = {
    parentStyle,
    childStyle: getGroupItemStyle(parentStyle, { first, last }),
    first,
    last,
  }

  return (
    <GroupItemContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </GroupItemContext.Provider>
  )
}

export default GroupItemProvider
