import { TextStyle, ViewStyle, ImageStyle } from 'react-native';

export type Style = ViewStyle | TextStyle | ImageStyle;

export type Styles = { [s: string]: Style };

export type StyleMap<T> = { [s: string]: T } | T[];

export const mapStyles = <V>(
  /**
   * An object or array to be iterated over.
   */
  map: StyleMap<V>,
  /**
   * A callback to produce style objects.
   */
  fn: (value: V, key: string) => Style,
  /**
   * Prefix to be added to each key.
   */
  prefix?: string,
): Styles => {
  const entries = Array.isArray(map)
    ? map.map((v) => [v, v])
    : Object.entries(map);

  return Object.fromEntries(
    entries.map(([k, v]) => [
      prefix ? `${prefix}-${String(k)}` : k,
      fn(v, String(k)),
    ]),
  );
};

export const composeStyles = (
  src: Styles,
  ...styles: (string | Style)[]
): Style => {
  const seq = styles
    .map((s): string[] | Style => (
      typeof s === 'string'
        ? s.split(/\s/).map((n) => n.trim()).filter((n) => n)
        : s
    ))
    .flat()
    .map((s) => {
      if (typeof s === 'string') return src[s] ?? {};
      return s;
    });

  return Object.assign({}, ...seq);
};

type TagFunctionParams<T> = [
  TemplateStringsArray, ...T[],
];

const isTemplateStringsArray = (a: unknown): a is TemplateStringsArray => {
  return Array.isArray(a)
    && a.every((v) => typeof v === 'string')
    && 'raw' in a;
};

const isTagFunctionParams = <T>(p: unknown[]): p is TagFunctionParams<T> => {
  return isTemplateStringsArray(p[0]);
};

export type StyParams = (string | Style)[]
| [TemplateStringsArray, ...(string | Style)[]]

export const sty = (
  src: Styles,
  ...styles: StyParams
) => {
  let ss: (string | Style)[];

  if (isTagFunctionParams(styles)) {
    const [tmpl, ...p] = styles;

    ss = tmpl
      // weave tmpl string and values
      .flatMap<string | Style>((t, i) => [t, p[i]])
      // join all adjacent strings
      .reduce<(string | Style)[]>((acc, cur) => {
        const last = acc.slice(-1)[0];

        if (typeof cur === 'string' && typeof last === 'string') {
          return [...acc.slice(0, -1), `${last}${cur}`];
        }

        return [...acc, cur];
      }, [])
      .filter((s) => s);
  } else {
    ss = styles;
  }

  return composeStyles(src, ...ss);
};

export const styFromSrc = (src: Styles) => {
  return (...args: StyParams) => sty(src, ...args);
};
