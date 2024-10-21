import React from 'react'
import { Pressable, TextInput, View } from 'react-native'
import { useStyles } from '../styles'
import Text from './lib/Text'
import Btn from './lib/Btn'

const FormLogin = () => {
  const { sty } = useStyles()

  return (
    <View style={sty`
      row align-items-center justify-content-center h-100
    `}
    >
      <View>
        <TextInput style={sty`border-1 rounded-2 ${{ height: 25 }}`} />
        <Btn>Login</Btn>
      </View>
    </View>
  )
}

export default FormLogin
