import { useContext } from 'react'
import GroupItemContext from './GroupItemContext'

export default function useGroupItem() {
  return useContext(GroupItemContext)
}
