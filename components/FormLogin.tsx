import React from 'react'
import { TextInput, View } from 'react-native'
import { useStyles } from '../styles'
import { Btn } from './lib'

const FormLogin = () => {
  const { sty } = useStyles()

  return (
    <View style={sty`
      row align-items-center justify-content-center h-100
    `}
    >
      <View>
        <TextInput style={sty`border-1 rounded-2 mb-3 ${{ height: 25 }}`} />
        <Btn disabled>Login</Btn>
      </View>
    </View>
  )
}

export default FormLogin
