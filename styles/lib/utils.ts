import { TextStyle, ViewStyle, ImageStyle } from 'react-native';
import Theme from './Theme';
import { defaults } from './consts';

type StyTextStyle = Omit<TextStyle, 'fontSize'> & {
  fontSize?: TextStyle['fontSize'] | `${number}%`;
};

export {
  StyTextStyle as TextStyle,
  ViewStyle,
  ImageStyle,
};

export type Style = StyTextStyle | ViewStyle | ImageStyle;

export type Styles = { [s: string]: Style };

export type StyleMap<T> = { [s: string]: T } | T[];

export const parseStyle = (
  theme: Theme,
  style: Style,
): ViewStyle | TextStyle | ImageStyle => {
  const st: Style = { ...style };

  // font size pencentage
  if (
    'fontSize' in st
    && typeof st.fontSize === 'string'
    && st.fontSize.match(/^\d+%$/)
  ) {
    const { fontSizes: { base = defaults.fontSizes.base } = {} } = theme.opts;
    const pct = Number(st.fontSize.replace('%', '')) / 100;
    st.fontSize = base * pct;
  }

  return st;
};

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
  theme: Theme,
  ...styles: (string | Style)[]
) => {
  const seq = styles
    .map((s): string[] | Style => (
      typeof s === 'string'
        ? s.split(/\s/).map((n) => n.trim()).filter((n) => n)
        : s
    ))
    .flat()
    .map((s) => {
      if (typeof s === 'string') return theme.styles[s] ?? {};
      return s;
    });

  return parseStyle(
    theme,
    Object.assign({}, ...seq),
  );
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
  theme: Theme,
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

  return composeStyles(theme, ...ss);
};

export const styWithTheme = (theme: Theme) => {
  return (...args: StyParams) => sty(theme, ...args);
};