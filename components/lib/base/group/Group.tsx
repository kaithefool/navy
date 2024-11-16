import React, { ReactNode } from 'react'
import { Sty, useStyles } from '@/styles'
import View from '../View'
import { isIterable } from '../../utils'
import GroupItem from './item'
import GroupBtn from './GroupBtn'

const Group = ({
  children,
  sty: style,
  dividerSty = 'bg-gray-200',
}: {
  children?: ReactNode
  sty?: Sty
  dividerSty?: Sty
}) => {
  const { sty } = useStyles()
  const s = sty(style)
  const { flexDirection: dir = 'column' } = s
  const a = isIterable<ReactNode>(children) && typeof children !== 'string'
    ? Array.from(children)
    : [children]

  const c = a.flatMap((e, i) => {
    const re = [
      <GroupItem
        key={`gp-item-${i}`}
        index={i}
        length={a.length}
        parentStyle={s}
      >
        {e}
      </GroupItem>,
    ]

    if (i) {
      // divider
      re.unshift(
        <View
          key={`gp-divider-${i}`}
          sty={sty`
            ${/^column/.test(dir)
                ? { height: 1 }
                : { width: 1 }
            }
            ${dividerSty}
          `}
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
