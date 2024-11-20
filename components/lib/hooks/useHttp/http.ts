import qs from 'qs'
import HttpError from './HttpError'

type ResponseTypes = 'arrayBuffer' | 'blob' | 'json' | 'text' | 'formData'

export type HttpUnstartedState = {
  status: 'unstarted'
}

export type HttpPendingState = {
  status: 'pending'
  raw?: Response
  progress: number
}

export type HttpSuccessState = {
  status: 'success'
  raw: Response
  payload?: Awaited<ReturnType<Response[ResponseTypes]>>
  progress: 1
}

export type HttpErrorState = {
  status: 'error'
  raw?: Response
  payload?: Awaited<ReturnType<Response[ResponseTypes]>>
  error: HttpError
  progress: number
}

const contentTypes = {
  json: 'application/json',
  text: 'text/plain',
} as const

export type HttpRequest = RequestInit & {
  url: string | URL
  query?: object
  requestType?: keyof typeof contentTypes
  responseType?: ResponseTypes
  onProgress?: (res: HttpPendingState) => void
}

export type HttpState = HttpUnstartedState | HttpPendingState | HttpErrorState | HttpSuccessState

export type HttpResponse = HttpErrorState | HttpSuccessState

export const mergeQueries = (
  url: string | URL,
  query: object = {},
): URL => {
  const u = url instanceof URL ? url : new URL(url)

  return new URL(
    `${u.origin}${u.pathname}${qs.stringify({
      ...qs.parse(u.search, { ignoreQueryPrefix: true }),
      ...query,
    }, { addQueryPrefix: true })}${u.hash}`,
  )
}

export const mergeHeaders = (...hArgs: (HeadersInit | undefined)[]): Headers => {
  const hs = hArgs.map((h) => {
    if (!h) return {}
    if (h instanceof Headers) {
      const o: { [s: string]: string } = {}

      h.forEach((value: string, key: string) => {
        o[key] = value
      })

      return o
    }
    if (Array.isArray(h)) {
      return Object.fromEntries(h)
    }

    return h
  })

  return new Headers(Object.assign({}, ...hs))
}

export async function fetchAndParse({
  url,
  query,
  headers,
  requestType = 'json',
  responseType = 'json',
  ...rest
}: HttpRequest, abortController: AbortController) {
  let res: Response | undefined
  let payload: HttpResponse['payload']

  try {
    res = await fetch(mergeQueries(url, query), {
      ...rest,
      headers: mergeHeaders(
        { 'content-type': contentTypes[requestType] },
        headers,
      ),
      signal: abortController.signal,
    })

    payload = await res[responseType]()

    // if status code isn't within the 2xx range
    if (!res.ok) throw res

    const r: HttpSuccessState = {
      status: 'success',
      raw: res,
      payload,
      progress: 1,
    }

    return r
  }
  catch (e) {
    const r: HttpErrorState = {
      status: 'error',
      raw: res,
      error: new HttpError(e),
      payload,
      progress: 0,
    }

    return r
  }
}

export class HttpPromise extends Promise<HttpResponse> {
  private readonly abortController?: AbortController

  constructor(input: HttpRequest) {
    if (typeof input === 'function') {
      super(input)
    }
    else {
      const abortController = new AbortController()
      super(resolve => resolve(
        fetchAndParse(input, abortController),
      ))
      this.abortController = abortController
    }
  }

  abort() {
    this.abortController?.abort()
  }
}

export default function http(req: HttpRequest) {
  return new HttpPromise(req)
}
