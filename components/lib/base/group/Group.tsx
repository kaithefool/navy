import React, { ReactNode } from 'react'
import { Sty, useStyles } from '@/styles'
import View from '../View'
import { isIterable } from '../../utils'
import GroupItem from './item'
import GroupBtn from './GroupBtn'

const Group = ({
  children,
  sty: style,
  dividerSty,
}: {
  children?: ReactNode
  sty?: Sty
  dividerSty?: Sty
}) => {
  const { sty } = useStyles()
  const s = sty(style)
  const a = isIterable<ReactNode>(children) && typeof children !== 'string'
    ? Array.from(children)
    : [children]
  const c = a.flatMap((e, i) => {
    const re = [
      <GroupItem
        key={`item-${i}`}
        index={i}
        length={a.length}
        parentStyle={s}
      >
        {e}
      </GroupItem>,
    ]

    if (i) {
      re.unshift(
        <View
          key={`divider-${i}`}
          sty={`border-top-1 border-gray-200 ${dividerSty}`}
        />,
      )
    }

    return re
  })

  return (
    <View sty={s}>
      {c}
    </View>
  )
}

Group.Item = GroupItem
Group.Btn = GroupBtn

export default Group
