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
   * Prefix string to be added to each key.
   *
   * @example
   * prefix-originalKey
   */
  prefix?: string,
  /**
   * Pseduo string to be added to each key
   *
   * @example
   * orginalKey:pseduo
   */
  pseudo?: string,
): Styles => {
  const entries = Array.isArray(map)
    ? map.map((v) => [v, v])
    : Object.entries(map);

  return Object.fromEntries(
    entries.map(([k, v]) => {
      let key = String(k);
      if (prefix) key = `${prefix}-${key}`;
      if (pseudo) key = `${key}:${pseudo}`;

      return [key, fn(v, String(k))];
    }),
  );
};

export const arrayToNumKeyObj = <T>(array: T[]) => {
  return array.reduce<{ [n: number]: T; }>(
    (o, v, i) => ({ ...o, [i]: v }), {},
  );
};
