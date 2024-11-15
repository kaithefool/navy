import React, { ReactNode } from 'react'
import { Sty } from '@/styles'
import View from '../View'
import { isIterable } from '../../utils'
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
  let c = children

  if (isIterable<ReactNode>(children) && typeof children !== 'string') {
    c = Array.from(children).flatMap((e, i) => {
      return !i
        ? [e]
        : [
            <View
              key={`divider-${i}`}
              sty={`border-top-1 border-gray-200 ${dividerSty}`}
            />,
            e,
          ]
    })
  }

  return (
    <View sty={style}>
      {c}
    </View>
  )
}

Group.Btn = GroupBtn

export default Group
