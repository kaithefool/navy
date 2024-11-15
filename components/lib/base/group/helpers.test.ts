import { describe, expect, test } from '@jest/globals'
import { ViewStyle } from 'react-native'
import { getGroupItemStyle } from './helpers'

describe('getGroupItemStyle', () => {
  const parentStyle: ViewStyle = {
    borderRadius: 1,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 4,
  }

  test('if every child in the middle has no border radius', () => {
    const s = getGroupItemStyle(parentStyle)

    expect(s.borderTopLeftRadius).toBe(0)
    expect(s.borderTopRightRadius).toBe(0)
    expect(s.borderBottomRightRadius).toBe(0)
    expect(s.borderBottomLeftRadius).toBe(0)
  })

  test('if the only child inherits all border radii', () => {
    const s = getGroupItemStyle(parentStyle, { first: true, last: true })

    expect(s.borderTopLeftRadius).toBe(1)
    expect(s.borderTopRightRadius).toBe(2)
    expect(s.borderBottomRightRadius).toBe(3)
    expect(s.borderBottomLeftRadius).toBe(4)
  })

  test('if the first child inherits top corner radii in column direction', () => {
    const s = getGroupItemStyle(parentStyle, { first: true })

    expect(s.borderTopLeftRadius).toBe(1)
    expect(s.borderTopRightRadius).toBe(2)
    expect(s.borderBottomRightRadius).toBe(0)
    expect(s.borderBottomLeftRadius).toBe(0)
  })
  test('if the last child inherits bottom corner radii in column direction', () => {
    const s = getGroupItemStyle(parentStyle, { last: true })

    expect(s.borderTopLeftRadius).toBe(0)
    expect(s.borderTopRightRadius).toBe(0)
    expect(s.borderBottomRightRadius).toBe(3)
    expect(s.borderBottomLeftRadius).toBe(4)
  })
  test('if the first child inherits left corner radii in row direction', () => {
    const s = getGroupItemStyle({
      ...parentStyle, flexDirection: 'row',
    }, { first: true })

    expect(s.borderTopLeftRadius).toBe(1)
    expect(s.borderTopRightRadius).toBe(0)
    expect(s.borderBottomRightRadius).toBe(0)
    expect(s.borderBottomLeftRadius).toBe(4)
  })
  test('if the last child inherits right corner radii in row direction', () => {
    const s = getGroupItemStyle({
      ...parentStyle, flexDirection: 'row',
    }, { last: true })

    expect(s.borderTopLeftRadius).toBe(0)
    expect(s.borderTopRightRadius).toBe(2)
    expect(s.borderBottomRightRadius).toBe(3)
    expect(s.borderBottomLeftRadius).toBe(0)
  })

  // reverse direction
  test('if the first child inherits bottom corner radii in reverse column direction', () => {
    const s = getGroupItemStyle({
      ...parentStyle, flexDirection: 'column-reverse',
    }, { first: true })

    expect(s.borderTopLeftRadius).toBe(0)
    expect(s.borderTopRightRadius).toBe(0)
    expect(s.borderBottomRightRadius).toBe(3)
    expect(s.borderBottomLeftRadius).toBe(4)
  })
  test('if the last child inherits top corner radii in reverse column direction', () => {
    const s = getGroupItemStyle({
      ...parentStyle, flexDirection: 'column-reverse',
    }, { last: true })

    expect(s.borderTopLeftRadius).toBe(1)
    expect(s.borderTopRightRadius).toBe(2)
    expect(s.borderBottomRightRadius).toBe(0)
    expect(s.borderBottomLeftRadius).toBe(0)
  })
  test('if the first child inherits right corner radii in reverse row direction', () => {
    const s = getGroupItemStyle({
      ...parentStyle, flexDirection: 'row-reverse',
    }, { first: true })

    expect(s.borderTopLeftRadius).toBe(0)
    expect(s.borderTopRightRadius).toBe(2)
    expect(s.borderBottomRightRadius).toBe(3)
    expect(s.borderBottomLeftRadius).toBe(0)
  })
  test('if the last child inherits left corner radii in reverse row direction', () => {
    const s = getGroupItemStyle({
      ...parentStyle, flexDirection: 'row-reverse',
    }, { last: true })

    expect(s.borderTopLeftRadius).toBe(1)
    expect(s.borderTopRightRadius).toBe(0)
    expect(s.borderBottomRightRadius).toBe(0)
    expect(s.borderBottomLeftRadius).toBe(4)
  })
})
