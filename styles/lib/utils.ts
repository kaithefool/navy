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
): { [s: string]: Style } => {
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

export const st = (styles: Styles, ...styleNames: string[]) => {
  const names = styleNames
    .flatMap((ns) => ns.split(' '))
    .map((n) => n.trim())
    .filter((n) => n);

  return Object.assign({}, ...names.map((n) => styles[n] || {}));
};