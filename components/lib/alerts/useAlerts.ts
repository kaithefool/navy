import { useContext } from 'react'
import AlertsContext from './AlertsContext'

export default function useAlerts() {
  return useContext(AlertsContext)
}
