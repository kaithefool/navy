import uniqueId from 'lodash/uniqueId'
import pick from 'lodash/pick'

type FieldValue = {
  [s: string]:
    string
    | string[]
    | FieldValue
    | FieldValue[]
}

function castToString(input: unknown): string {
  if (typeof input === 'string') return input
  if (typeof input === 'number') return input.toString()
  if (input === null) return ''

  throw new TypeError('Unable to cast value to string', { cause: input })
}

function isObject(input: unknown): input is Record<string, unknown> {
  return typeof input === 'object'
    && !Array.isArray(input)
    && input !== null
}

function castToFieldValue(
  defaults: FieldValue,
  input: unknown = {},
  idKey: string | string[] = [],
  tempKey: boolean = false,
) {
  const idKeys = Array.isArray(idKey) ? idKey : [idKey]
  let result: FieldValue = {}

  if (!isObject(input)) {
    throw new TypeError('Unable to cast non-object value to object', { cause: input })
  }

  if (idKeys.length) {
    result = pick(input, idKey) as FieldValue
  }
  if (tempKey && !Object.keys(result).find(k => idKeys.includes(k))) {
    result['_key'] = uniqueId()
  }

  for (const key in defaults) {
    const def = defaults[key]
    const value = input[key]

    if (typeof value === 'undefined') {
      result[key] = def
    }
    else if (typeof def === 'string') {
      result[key] = castToString(value)
    }
    else if (Array.isArray(def)) {
      if (!def.length) {
        throw new Error(`Array item default is undefined: ${key}`)
      }
      if (!Array.isArray(value)) {
        throw new Error('Unable to cast non-array value to array')
      }

      const childDefault = def[0]

      if (typeof childDefault === 'object') {
        result[key] = value.map(v => castToFieldValue(childDefault, v, idKey, true))
      }
      else {
        result[key] = value.map(v => castToString(v))
      }
    }
    else if (isObject(def)) {
      result[key] = castToFieldValue(def, value, idKey)
    }
  }

  return result
}

export function castToFormikDefaults<V extends FieldValue>(
  defaults: V,
  stored?: unknown,
  {
    idKey = ['id', '_id'],
  }: {
    idKey?: string | string[]
  } = {},
): V {
  return castToFieldValue(defaults, stored, idKey) as V
}
