import { useEffect } from 'react'
import { HttpState } from '../hooks/useHttp'
import useAlerts from './useAlerts'
import { faFaceFrown } from '@fortawesome/free-regular-svg-icons/faFaceFrown'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function useHttpAlerts(
  state: HttpState,
) {
  const { push } = useAlerts()

  console.log(state)

  useEffect(() => {
    if (state.status === 'success') {
      push({
        icon: faCheckCircle,
        theme: 'success',
        body: 'Done',
      })
    }
    if (state.status === 'error') {
      push({
        icon: faFaceFrown,
        theme: 'danger',
        body: 'Errrrr',
      })
    }
  }, [state.status])
}
