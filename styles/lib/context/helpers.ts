import Theme, { Style } from '../theme'

export type StyParam = string | Style

export type StyParams = StyParam[]
  | [TemplateStringsArray, ...StyParam[]]

type TagFunctionParams<T> = [
  TemplateStringsArray, ...T[],
]

const isTemplateStringsArray = (a: unknown): a is TemplateStringsArray => {
  return Array.isArray(a)
    && a.every(v => typeof v === 'string')
    && 'raw' in a
}

const isTagFunctionParams = <T>(p: unknown[]): p is TagFunctionParams<T> => {
  return isTemplateStringsArray(p[0])
}

export const composeStyles = (
  theme: Theme,
  ...styles: StyParam[]
) => {
  const seq = styles
    .map((s): string[] | Style => (
      typeof s === 'string'
        ? s.split(/\s/).map(n => n.trim()).filter(n => n)
        : s
    ))
    .flat()
    .map((s) => {
      if (typeof s === 'string') return theme.styles[s] ?? {}
      return s
    })

  return theme.parseStyle(
    Object.assign({}, ...seq),
  )
}

export const sty = (
  theme: Theme,
  ...styles: StyParams
) => {
  let ss: StyParam[]

  if (isTagFunctionParams(styles)) {
    const [tmpl, ...p] = styles

    ss = tmpl
      // weave tmpl string and values
      .flatMap<string | Style>((t, i) => [t, p[i]])
      // join all adjacent strings
      .reduce<(string | Style)[]>((acc, cur) => {
      const last = acc.slice(-1)[0]

      if (typeof cur === 'string' && typeof last === 'string') {
        return [...acc.slice(0, -1), `${last}${cur}`]
      }

      return [...acc, cur]
    }, [])
      .filter(s => s)
  }
  else {
    ss = styles
  }

  return composeStyles(theme, ...ss)
}

export const styWithTheme = (theme: Theme) => {
  return (...args: StyParams) => sty(theme, ...args)
}
