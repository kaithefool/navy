import { Palette } from './palette';
import { mapStyles, StyleMap, TextStyle } from './utils';
import { defaults } from './consts';

export type TypographyOpts = {
  palette: Palette;
  fontFamilies: StyleMap<TextStyle['fontFamily']>;
  weights?: StyleMap<TextStyle['fontWeight']>;
  styles?: StyleMap<TextStyle['fontStyle']>;
  fontSizes?: {
    base: number;

    1?: TextStyle['fontSize'];
    2?: TextStyle['fontSize'];
    3?: TextStyle['fontSize'];
    4?: TextStyle['fontSize'];
    5?: TextStyle['fontSize'];
    6?: TextStyle['fontSize'];

    sm?: TextStyle['fontSize'];
    xs?: TextStyle['fontSize'];
  };
  body?: TextStyle;
  headings?: TextStyle & { sizes?: number[] };
};

export default function makeTypographyStyles({
  palette,
  fontFamilies,
  weights = ['normal'],
  styles = ['italic'],
  fontSizes = defaults.fontSizes,
  body = {},
  headings = {},
  //
}: TypographyOpts) {
  const fs = Object.assign({}, defaults.fontSizes, fontSizes);

  return {
    ...mapStyles(palette, (v) => ({ ...body, color: v }), 'text'),
    ...mapStyles(fontFamilies, (v) => ({ ...body, fontFamily: v }), 'font'),
    ...mapStyles(weights, (v) => ({ ...body, fontWeight: v }), 'fw'),
    ...mapStyles(styles, (v) => ({ ...body, fontStyle: v }), 'fst'),
    ...mapStyles(fs, ((v) => ({ ...body, fontSize: v })), 'fs'),
    ...mapStyles(
      ['auto', 'left', 'right', 'center', 'justify'] as const,
      ((v) => ({ ...body, textAlign: v })),
      'text',
    ),
    ...mapStyles(
      { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 } as const,
      ((v) => ({ ...body, fontSize: fs[v], ...headings })),
    ),
  };
}