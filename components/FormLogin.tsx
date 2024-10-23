import React from 'react'
import { Btn, View, TextInput, Text } from './lib/base'
import Form from './lib/form'

const FormLogin = () => {
  return (
    <View sty="row align-items-center justify-content-center h-100">
      <View sty="w-100 p-3">
        <Form
          defaults={{
            account: '',
            passowrd: '',
          }}
        >
          <Text sty="fw-bold mb-1 fs-sm">Account</Text>
          <Form.TextInput name="account" sty="mb-2" />
          <Text sty="fw-bold mb-1 fs-sm">Password</Text>
          <TextInput sty="mb-2" secureTextEntry />
          <Btn>Login</Btn>
        </Form>
      </View>
    </View>
  )
}

export default FormLogin
