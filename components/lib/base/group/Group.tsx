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
  const parentStyle = sty(style)
  const { flexDirection: dir = 'column' } = parentStyle
  let toRender = isIterable<ReactNode>(children) && typeof children !== 'string'
    ? Array.from(children)
    : [children]

  toRender = toRender.flatMap((e, i) => {
    const re = [
      <GroupItem
        key={`gp-item-${i}`}
        index={i}
        length={toRender.length}
        parentStyle={parentStyle}
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
    <View sty={parentStyle}>
      {toRender}
    </View>
  )
}

Group.Item = GroupItem
Group.Btn = GroupBtn

export default Group
