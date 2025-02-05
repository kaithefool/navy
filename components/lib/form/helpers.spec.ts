import { describe, expect, it } from '@jest/globals'
import { castToFormikDefaults } from './helpers'

describe('castToFormikDefaults', () => {
  it('excludes all properties not defined in defaults', () => {
    expect(castToFormikDefaults(
      { foo: '' },
      { foo: 'bax', qux: 'quux' },
    )).not.toHaveProperty('qux')
    expect(castToFormikDefaults(
      { foo: { bar: '' } },
      { foo: { bar: 'bax', qux: 'quux' } },
    ).foo).not.toHaveProperty('qux')
    expect(castToFormikDefaults(
      { foo: [{ bar: '' }] },
      { foo: [{ bar: 'qux', baz: 'quux' }] },
    ).foo[0]).not.toHaveProperty('baz')
  })
  it('adds default properties to which is not defined in stored', () => {
    expect(castToFormikDefaults(
      { foo: '', qux: '' },
      { foo: 'bar' },
    )).toMatchObject({ foo: 'bar', qux: '' })
    expect(castToFormikDefaults(
      { foo: { bar: '', baz: '' } },
      { foo: { bar: 'qux' } },
    ).foo).toMatchObject({ bar: 'qux', baz: '' })
    expect(castToFormikDefaults(
      { foo: [{ bar: '', baz: '' }] },
      { foo: [{ bar: 'qux' }] },
    ).foo[0]).toMatchObject({ bar: 'qux', baz: '' })
  })
  it('always keeps id, or anything specified in the option', () => {
    expect(castToFormikDefaults(
      { foo: '' },
      { id: 'someid' },
    )).toMatchObject({ id: 'someid' })
    expect(castToFormikDefaults(
      { foo: '' },
      { objectid: 'someid' },
      { idKey: 'objectid' },
    )).toMatchObject({ objectid: 'someid' })
    expect(castToFormikDefaults(
      { foo: { bar: '' } },
      { foo: { id: 'someid' } },
    ).foo).toMatchObject({ id: 'someid' })
    expect(castToFormikDefaults(
      { foo: { bar: '' } },
      { foo: { objectid: 'someid' } },
      { idKey: 'objectid' },
    ).foo).toMatchObject({ objectid: 'someid' })
    expect(castToFormikDefaults(
      { foo: [{ bar: '' }] },
      { foo: [{ id: 'someid' }] },
    ).foo[0]).toMatchObject({ id: 'someid' })
    expect(castToFormikDefaults(
      { foo: [{ bar: '' }] },
      { foo: [{ objectid: 'someid' }] },
      { idKey: 'objectid' },
    ).foo[0]).toMatchObject({ objectid: 'someid' })
  })
  it('transform all numbers into string', () => {
    expect(castToFormikDefaults(
      { foo: '', qux: '' },
      { foo: 1 },
    )).toMatchObject({ foo: '1', qux: '' })
    expect(castToFormikDefaults(
      { foo: { bar: '', baz: '' } },
      { foo: { bar: 1 } },
    ).foo).toMatchObject({ bar: '1', baz: '' })
    expect(castToFormikDefaults(
      { foo: [{ bar: '', baz: '' }] },
      { foo: [{ bar: 1 }] },
    ).foo[0]).toMatchObject({ bar: '1', baz: '' })
  })
  it('gives a key to every no id object in arrays', () => {
    expect(castToFormikDefaults(
      { foo: [{ bar: '', baz: '' }] },
      { foo: [{ bar: 1 }] },
    ).foo[0]).toHaveProperty('_key')
  })
})
