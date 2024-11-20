import { describe, expect, it } from '@jest/globals'
import { isTagFunctionParams } from './helpers'

describe('isTagFunctionParams', () => {
  it('returns true if the value is coming from a tagged template', () => {
    const fn = (...params: unknown[]) => {
      expect(isTagFunctionParams(params)).toBe(true)
    }

    fn`foo ${3}`
    fn`foo ${{ baz: 'qux' }} bar:${'qux'}`
  })
})
