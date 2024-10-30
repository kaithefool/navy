import { useState, useRef, useEffect } from 'react'
import http, {
  HttpPromise,
  HttpRequest,
  HttpResponse,
  HttpState,
  HttpSuccessState,
} from './http'
import useComparable from '../useComparable'

export default function useHttp(request?: HttpRequest) {
  const [state, setState] = useState<HttpState>({
    status: 'pending',
    progress: 0,
  })
  const promise = useRef<HttpPromise>()
  const fetched = useRef<HttpSuccessState>()
  const res = useRef<HttpResponse>()
  const req = async (rq: HttpRequest) => {
    const p = http(rq)
    promise.current = p
    const rs = await p

    if (rs.status === 'success') {
      fetched.current = rs
    }
    res.current = rs
    setState(rs)

    return rs
  }

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
