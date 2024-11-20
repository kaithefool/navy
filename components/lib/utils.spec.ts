import { describe, expect, it } from '@jest/globals'
import { isIterable } from './utils'

describe('isIterable type guard', () => {
  it('returns true if it is an array', () => {
    expect(isIterable([])).toBe(true)
  })
  it('returns true if it is a string', () => {
    expect(isIterable('foo bar')).toBe(true)
  })
  it('returns true if it follows iterable protocol', () => {
    expect(isIterable({
      [Symbol.iterator]() {
        return { next: () => ({ done: true }) }
      },
    })).toBe(true)
  })
  it('return true if it is created by a generator', () => {
    function* g() {
      yield 'foo'
      yield 'bar'
    }
    expect(isIterable(g())).toBe(true)
  })
  it('return false for anything else', () => {
    expect(isIterable(undefined)).toBe(false)
    expect(isIterable({})).toBe(false)
    expect(isIterable(null)).toBe(false)
    expect(isIterable(1)).toBe(false)
    expect(isIterable(() => {})).toBe(false)
  })
})
