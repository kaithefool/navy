import { Tabs, router } from 'expo-router'
import React from 'react'

import FA from '@/components/lib/base/FA'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/components/lib/context/config'

const ProtectedLayout = () => {
  useAuth(true)

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FA icon={faHome} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account/index"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <FA icon={faCog} color={color} />,
        }}
      />
    </Tabs>
  )
}

export default ProtectedLayout
