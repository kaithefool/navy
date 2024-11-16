import React from 'react'
import { Text } from '../lib/base'
import Form from '../lib/form'
import { useAuth } from '../lib/config'
import { HttpResponse } from '../lib/hooks/useHttp'

const FormLogin = ({
  onLoggedIn = () => {},
}: {
  onLoggedIn?: (payload: HttpResponse['payload']) => void
}) => {
  const { login } = useAuth()

  return (
    <Form
      api={{
        url: '/auth',
      }}
      defaults={{
        email: 'admin@d.com',
        password: '123$5^7*(0',
      }}
      onSubmitted={(res) => {
        if (res.status === 'success') {
          login(res.payload)
          onLoggedIn(res.payload)
        }
      }}
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
      <Form.BtnSubmit variant="tonal" color="primary">Login</Form.BtnSubmit>
    </Form>
  )
}

export default FormLogin
