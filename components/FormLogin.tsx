import React from 'react'
import { View, Text } from './lib/base'
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
          <Form.InputText name="account" sty="mb-2" autoCapitalize="none" />
          <Text sty="fw-bold mb-1 fs-sm">Password</Text>
          <Form.InputText name="password" sty="mb-2" secureTextEntry />
          <Form.BtnSubmit>Login</Form.BtnSubmit>
        </Form>
      </View>
    </View>
  )
}

export default FormLogin
