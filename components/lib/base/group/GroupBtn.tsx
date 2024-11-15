import React, { ComponentProps } from 'react'
import { Sty, useStyles } from '@/styles'
import Btn from '../Btn'

const GroupBtn = ({
  sty: style,
  ...props
}: {
  sty?: Sty
} & ComponentProps<typeof Btn>) => {
  const { sty } = useStyles()

  return (
    <Btn
      sty={sty`justify-content-start rounded-0 ${style}`}
      {...props}
    />
  )
}

export default GroupBtn
