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
    setState({
      status: 'pending',
      progress: 0,
    })
    const p = http({
      ...rq,
      url: typeof rq.url === 'string'
        && !/^(?:(ht|f)tp(s?)\:\/\/)/.test(rq.url)
        ? `${api}${rq.url}`
        : rq.url,
    })
    promise.current = p
    const rs = await p

    if (rs.status === 'success') {
      fetched.current = rs
    }
    res.current = rs
    setState(rs)

    return rs
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
