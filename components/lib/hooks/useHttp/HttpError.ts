type AbortError = {
  name: 'AbortError'
}

const isAbortError = (e: unknown): e is AbortError => {
  return e !== null
    && typeof e === 'object'
    && 'name' in e
    && e.name === 'AbortError'
}

export default class HttpError {
  readonly type?: number | 'network' | 'aborted' | 'parser'
  readonly cause?: unknown

  constructor(
    input: unknown
      | Response
      | TypeError
      | AbortError,
  ) {
    this.cause = input

    if (input instanceof TypeError) {
      if (input.message === 'Network request failed') {
        this.type = 'network'
      }
    }
    if (isAbortError(input)) {
      this.type = 'aborted'
    }
    if (input instanceof Response) {
      this.type = input.status
    }
    if (input instanceof SyntaxError) {
      this.type = 'parser'
    }

    // not catching
    if (!this.type) {
      throw input
    }
  }
}
