import { describe, expect, it } from '@jest/globals'
import grayscale from './grayscale'

describe('grayscale color generator', () => {
  const colors = grayscale()

  it('makes 9 gray colors', () => {
    expect(Object.keys(colors).length).toBe(9)

    let n: keyof typeof colors
    for (n in colors) {
      expect(colors[n]).toMatch(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
    }
  })
})
