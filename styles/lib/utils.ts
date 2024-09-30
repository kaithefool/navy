import { TextStyle, ViewStyle, ImageStyle } from 'react-native';

export type Style = ViewStyle | TextStyle | ImageStyle;

export const mapStyles = <V>(
  /**
   * An object to be iterated over
   */
  map: { [key: string | number]: V },
  /**
   * A callback to produce style objects
   */
  fn: (value: V, key: string) => Style,
  /**
   * Prefix to be added to each key
   */
  prefix?: string,
): { [key: string]: Style } => {
  return Object.fromEntries(
    Object.entries(map).map(([k, v]) => [
      prefix ? `${prefix}-${String(k)}` : k,
      fn(v, k),
    ]),
  );
};