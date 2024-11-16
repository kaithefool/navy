import React from 'react'
import { Group, View } from '@/components/lib/base'
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons/faShieldHalved'
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff'
import { useAuth } from '@/components/lib/config'

const AccountHome = () => {
  const { logout } = useAuth()

  return (
    <View sty="p-3">
      <Group sty="col g-0 rounded-3 border-1 border-gray-200">
        <Group.Btn icon={faShieldHalved}>
          Password
        </Group.Btn>
        <Group.Btn icon={faUser}>
          Edit Profile
        </Group.Btn>
        <Group.Btn icon={faPowerOff} onPress={logout}>
          Logout
        </Group.Btn>
      </Group>
    </View>
  )
}

export default AccountHome
