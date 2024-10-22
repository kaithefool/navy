import Theme, { Style } from '../theme'

export type Sty = string | Style | false | undefined

export type Stys = (Sty | Sty[])[]
  | [TemplateStringsArray, ...(Sty | Sty[])[]]

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
  ...styles: Sty[]
) => {
  const seq = styles
    .map((s): string[] | Style | false | undefined => (
      typeof s === 'string'
        ? s.split(/\s/).map(n => n.trim()).filter(n => n)
        : s
    ))
    .flat()
    .filter(s => s)
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
  ...styles: Stys
) => {
  let ss: Sty[]

  if (isTagFunctionParams(styles)) {
    const [tmpl, ...p] = styles

    ss = tmpl
      // weave tmpl string and values
      .flatMap<Sty | Sty[]>((t, i) => [t, p[i]])
      // flatten nested arrays
      .flat()
      // join all adjacent strings
      .reduce<Sty[]>((acc, cur) => {
        const last = acc.slice(-1)[0]

        if (typeof cur === 'string' && typeof last === 'string') {
          return [...acc.slice(0, -1), `${last}${cur}`]
        }

        return [...acc, cur]
      }, [])
  }
  else {
    ss = styles.flat()
  }

  return composeStyles(theme, ...ss)
}

export const styWithTheme = (theme: Theme) => {
  return (...args: Stys) => sty(theme, ...args)
}
