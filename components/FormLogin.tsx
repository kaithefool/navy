import React from 'react'
import { Btn, View, TextInput, Text } from './lib'

const FormLogin = () => {
  return (
    <View sty="row align-items-center justify-content-center h-100">
      <View sty="w-100 p-3">
        <Text sty="fw-bold mb-1 fs-sm">Account</Text>
        <TextInput sty="mb-2" />
        <Text sty="fw-bold mb-1 fs-sm">Password</Text>
        <TextInput sty="mb-2" secureTextEntry />
        <Btn disabled>Login</Btn>
      </View>
    </View>
  )
}

export default FormLogin
