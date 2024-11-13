import React from 'react'
import { Btn, View } from '@/components/lib/base'
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons/faShieldHalved'

const AccountHome = () => {
  return (
    <View sty="p-3">
      <Btn icon={faShieldHalved}>
        Password
      </Btn>
      <Btn icon={faShieldHalved}>
        Edit Profile
      </Btn>
      <Btn icon={faShieldHalved}>
        Logout
      </Btn>
    </View>
  )
}

export default AccountHome
