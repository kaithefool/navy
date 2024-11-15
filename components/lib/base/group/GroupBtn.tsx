import React, { ComponentProps } from 'react'
import { Sty, useStyles } from '@/styles'
import Btn from '../Btn'
import { useGroupItem } from './item'

const GroupBtn = ({
  sty: style,
  ...props
}: {
  sty?: Sty
} & ComponentProps<typeof Btn>) => {
  const { sty } = useStyles()
  const { childStyle } = useGroupItem()

  return (
    <Btn
      sty={sty`justify-content-start ${childStyle} ${style}`}
      {...props}
    />
  )
}

export default GroupBtn
