import { describe, expect, it } from '@jest/globals'
import { mergeHeaders, mergeQueries } from './http'
import qs from 'qs'

const url = new URL('http://example.com')

describe('mergeQueries', () => {
  it('has no question mark as seperator if there is no query', () => {
    expect(mergeQueries(url).href).not.toMatch(/\?/)
    expect(mergeQueries(url, {}).href).not.toMatch(/\?/)
  })
  it('keeps hashes', () => {
    expect(mergeQueries(`${url.href}#foo`, {
      bar: 'baz',
    }).hash).toBe('#foo')
  })
  it('merges to existing query in the URL', () => {
    let u = mergeQueries(url, { foo: 'bar' })
    u = mergeQueries(u, { baz: 'qux' })

    expect(qs.parse(u.search, { ignoreQueryPrefix: true }))
      .toEqual({ foo: 'bar', baz: 'qux' })
  })
})

describe('mergeHeaders', () => {
  it('merge multiple headers in different forms', () => {
    const headers = mergeHeaders(
      { 'Content-Type': 'text/plain' },
      new Headers({ 'Accept-Language': 'en' }),
      [['Content-Length', '300']],
    )

    expect(headers.get('Content-Type')).toBe('text/plain')
    expect(headers.get('Accept-Language')).toBe('en')
    expect(headers.get('Content-Length')).toBe('300')
  })
})
