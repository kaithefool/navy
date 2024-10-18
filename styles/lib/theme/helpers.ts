import { Style, Styles } from './Theme';

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

export const arrayToNumKeyObj = <T>(array: T[]) => {
  return array.reduce<{ [n: number]: T; }>(
    (o, v, i) => ({ ...o, [i]: v }), {},
  );
};
