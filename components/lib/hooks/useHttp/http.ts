export class HttpError {
  readonly type?: number | 'NETWORK' | 'PARSER'
  readonly cause?: unknown

  constructor(input: unknown) {
    this.cause = input

    if (input && typeof input === 'object') {
      if (
        'cause' in input && input.cause && typeof input.cause === 'object'
        && 'code' in input.cause
      ) {
        const { code } = input.cause
        if (code === 'ECONNREFUSED') {
          this.type = 'NETWORK'
        }
      }

      if (input instanceof Response && !input.ok) {
        this.type = input.status
      }

      if (input instanceof SyntaxError) {
        this.type = 'PARSER'
      }
    }

    if (!this.type) {
      throw input
    }
  }
}

type ResponseTypes = 'arrayBuffer' | 'blob' | 'json' | 'text' | 'formData'

export type HttpPendingResponse = {
  status: 'pending'
  raw?: Response
  progress: number
}

export type HttpSuccessResponse = {
  status: 'success'
  raw: Response
  payload?: Awaited<ReturnType<Response[ResponseTypes]>>
  progress: 1
}

export type HttpErrorResponse = {
  status: 'error'
  raw?: Response
  payload?: Awaited<ReturnType<Response[ResponseTypes]>>
  error: HttpError
  progress: number
}

export type HttpRequest = RequestInit & {
  url: string | URL
  responseType?: ResponseTypes
  onProgress?: (res: HttpPendingResponse) => void
}

export type HttpStatus = HttpPendingResponse | HttpErrorResponse | HttpSuccessResponse

export type HttpResponse = HttpErrorResponse | HttpSuccessResponse

export type HttpPromise = Promise<HttpResponse> & {
  abort: () => void
}

export default function http({
  url,
  responseType = 'json',
  onProgress,
  ...rest
}: HttpRequest): HttpPromise {
  const abortCtrl = new AbortController()
  const promise = (async () => {
    let res: Response | undefined
    let payload: HttpResponse['payload']

    try {
      res = await fetch(url, {
        ...rest,
        signal: abortCtrl.signal,
      })

      payload = await res[responseType]()

      // if status code isn't within the 2xx range
      if (!res.ok) {
        throw res
      }

      const r: HttpSuccessResponse = {
        status: 'success',
        raw: res,
        payload,
        progress: 1,
      }

      return r
    }
    catch (e) {
      const r: HttpErrorResponse = {
        status: 'error',
        raw: res,
        error: new HttpError(e),
        progress: 0,
      }

      return r
    }
  })()

  return {
    ...promise,
    abort: () => abortCtrl.abort(),
  }
}
