import { createContext } from 'react'
import { ViewStyle } from 'react-native'

export type GroupItemContextType = {
  parentStyle: ViewStyle
  childStyle: ViewStyle
  first: boolean
  last: boolean
}

export default createContext<GroupItemContextType>({
  parentStyle: {},
  childStyle: {},
  first: false,
  last: false,
})
