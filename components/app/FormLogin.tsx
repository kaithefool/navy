import React from 'react'
import { View, Text } from '../lib/base'
import Form from '../lib/form'
import { useConfig } from '../lib/context/config'

const FormLogin = () => {
  const { setAuth } = useConfig()

  return (
    <View sty="row align-items-center justify-content-center mih-100">
      <View sty="w-100 p-3">
        <Form
          api={{
            url: '/auth',
          }}
          defaults={{
            email: 'admin@d.com',
            password: '123$5^7*(0',
          }}
          onSubmitted={res => setAuth(res.payload)}
        >
          <Text sty="fw-bold mb-1 fs-sm">Email</Text>
          <Form.InputText
            name="email"
            sty="mb-2"
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
          <Text sty="fw-bold mb-1 fs-sm">Password</Text>
          <Form.InputText name="password" sty="mb-2" secureTextEntry />
          <Form.BtnSubmit>Login</Form.BtnSubmit>
        </Form>
      </View>
    </View>
  )
}

export default FormLogin
