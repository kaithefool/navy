import { useState, useRef, useEffect } from 'react'
import http, {
  HttpPromise,
  HttpRequest,
  HttpResponse,
  HttpState,
  HttpSuccessState,
} from './http'
import useComparable from '../useComparable'
import { useConfig } from '../../config'
import { useHttpAlerts } from '../../alerts'

export default function useHttp(request?: HttpRequest) {
  const { api } = useConfig()
  const [state, setState] = useState<HttpState>({
    status: 'unstarted',
  })
  const promise = useRef<HttpPromise>()
  const fetched = useRef<HttpSuccessState>()
  const res = useRef<HttpResponse>()
  const req = async (rq: HttpRequest) => {
    promise.current?.abort()

    setState({
      status: 'pending',
      progress: 0,
    })
    promise.current = http({
      ...rq,
      url: typeof rq.url === 'string'
        && !/^(?:(ht|f)tp(s?)\:\/\/)/.test(rq.url)
        ? `${api}${rq.url}`
        : rq.url,
    })
    res.current = await promise.current
    setState(res.current)
    if (res.current.status === 'success') {
      fetched.current = res.current
    }

    return res.current
  }

  // alerts
  useHttpAlerts(state)

  useEffect(() => {
    // shortcut to call req in init
    if (request) req(request)

    // prevent memory leak
    return () => {
      promise.current?.abort()
    }
  }, [useComparable(request)])

  return {
    req,
    res: res.current,
    state,
    fetched: fetched.current,
    abort: () => promise.current?.abort(),
  }
}
