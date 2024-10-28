import { useState, useRef, useEffect } from 'react'
import http, {
  HttpPromise,
  HttpRequest,
  HttpStatus,
  HttpSuccessResponse,
} from './http'
import useComparable from '../useComparable'

export default function useHttp(request: HttpRequest) {
  const [res, setRes] = useState<HttpStatus>({
    status: 'pending',
    progress: 0,
  })
  const promise = useRef<HttpPromise>()
  const fetched = useRef<HttpSuccessResponse>()
  const req = async (rq: HttpRequest) => {
    const p = http(rq)
    promise.current = p
    const rs = await p

    if (rs.status === 'success') {
      fetched.current = rs
    }

    setRes(rs)
  }

  useEffect(() => {
    // shortcut to call req in init
    if (request) req(request)

    // prevent memory leak
    return () => promise.current?.abort()
  }, [useComparable(request)])

  return {
    req,
    res,
    fetched,
    abort: () => promise.current?.abort(),
  }
}
