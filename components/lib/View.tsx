import React from 'react'
import { View as NativeView } from 'react-native'
import Styles from '../../styles'

const View = ({ ...props }) => {
  return (
    <Styles.Styled
      component={NativeView}
      {...props}
    />
  )
}

export default View
