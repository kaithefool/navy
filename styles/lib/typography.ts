import { TextStyle } from 'react-native';
import { Palette } from './palette';
import { mapStyles, StyleMap } from './utils';

export type TypographyOpts = {
  fontFamilies: StyleMap<TextStyle['fontFamily']>;
  weights?: StyleMap<TextStyle['fontWeight']>;
  styles?: StyleMap<TextStyle['fontStyle']>;
  body?: TextStyle;
  headings?: TextStyle & { sizes: number[] };
};

export default function makeTypographyStyles(palette: Palette, {
  fontFamilies,
  weights = ['normal'],
  styles = ['italic'],
  body = { letterSpacing: .12 },
  headings,
  //
}: TypographyOpts) {
  return {
    ...mapStyles(palette, (v) => ({ color: v }), 'text'),
    ...mapStyles(fontFamilies, (v) => ({ fontFamily: v }), 'font'),
    ...mapStyles(weights, (v) => ({ fontWeight: v }), 'fw'),
    ...mapStyles(styles, (v) => ({ fontStyle: v }), 'fst'),
  };
}