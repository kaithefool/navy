import HttpError from './HttpError'

type ResponseTypes = 'arrayBuffer' | 'blob' | 'json' | 'text' | 'formData'

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

export type HttpRequest = RequestInit & {
  url: string | URL
  responseType?: ResponseTypes
  onProgress?: (res: HttpPendingState) => void
}

export type HttpState = HttpPendingState | HttpErrorState | HttpSuccessState

export type HttpResponse = HttpErrorState | HttpSuccessState

export class HttpPromise extends Promise<HttpResponse> {
  constructor(
    private readonly requestFn: () => Promise<HttpResponse>,
    private readonly abortController: AbortController,
  ) {
    super(resolve => resolve(requestFn()))
  }

  abort() {
    this.abortController.abort()
  }
}

export default function http({
  url,
  requestType = 'json',
  responseType = 'json',
  ...rest
}: HttpRequest): HttpPromise {
  const abortCtrl = new AbortController()

  return new HttpPromise(async () => {
    let res: Response | undefined
    let payload: HttpResponse['payload']

    try {
      res = await fetch(url, {
        ...rest,
        signal: abortCtrl.signal,
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
  }, abortCtrl)
}
