export function isIterable<T>(a: unknown): a is Iterable<T> | string {
  return !!a
    && (
      typeof a === 'string'
      || (typeof a === 'object' && Symbol.iterator in a)
    )
    && typeof a[Symbol.iterator] === 'function'
}
