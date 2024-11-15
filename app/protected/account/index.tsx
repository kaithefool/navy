import React from 'react'
import { Btn, View } from '@/components/lib/base'
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons/faShieldHalved'
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff'

const AccountHome = () => {
  return (
    <View sty="p-3">
      <Btn icon={faShieldHalved} sty="justify-content-start rounded-0">
        Password
      </Btn>
      <Btn icon={faUser}>
        Edit Profile
      </Btn>
      <Btn icon={faPowerOff}>
        Logout
      </Btn>
    </View>
  )
}

export default AccountHome
