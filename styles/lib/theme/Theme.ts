import { Theme as NavTheme } from '@react-navigation/native';
import { ImageStyle, TextStyle, ViewStyle, DimensionValue } from 'react-native';

import makePalette, { Palette } from './palette';
import makeTypographyStyles from './typography';
import makeLayoutStyles from './layout';
import { StyleMap } from './helpers';

export type StyTextStyle = Omit<TextStyle, 'fontSize'> & {
  fontSize?: TextStyle['fontSize'] | `${number}%`;
};

export {
  StyTextStyle as TextStyle,
  ViewStyle,
  ImageStyle,
};

export type Style = StyTextStyle | ViewStyle | ImageStyle;

export type Styles = { [s: string]: Style; };

export type ThemeOpts = {
  nav: NavTheme;

  palette: Palette;

  spacer?: number;
  spacers?: number[];
  dimensions?: { [s: string | number]: DimensionValue };
  borderWidths?: number[],
  borderRadius?: number[],

  fontFamilies: StyleMap<StyTextStyle['fontFamily']>;
  fontWeights?: StyleMap<StyTextStyle['fontWeight']>;
  fontStyles?: StyleMap<StyTextStyle['fontStyle']>;
  fontSizes?: {
    base?: number;
    xs?: StyTextStyle['fontSize'];
    sm?: StyTextStyle['fontSize'];
    md?: StyTextStyle['fontSize'];
    lg?: StyTextStyle['fontSize'];
    1?: StyTextStyle['fontSize'];
    2?: StyTextStyle['fontSize'];
    3?: StyTextStyle['fontSize'];
    4?: StyTextStyle['fontSize'];
    5?: StyTextStyle['fontSize'];
    6?: StyTextStyle['fontSize'];
  };
  body?: StyTextStyle;
  headings?: StyTextStyle;
  btns?: {
    sm?: ViewStyle,
    md?: ViewStyle,
    lg?: ViewStyle,

    outline?: ViewStyle;

    pressed?: ViewStyle;
    disabled?: ViewStyle;
  },
};

const defaultFontSizes = {
  base: 16,
  xs: '625%',
  sm: '85%',
  md: '100%',
  lg: '125%',
  1: '250%',
  2: '200%',
  3: '175%',
  4: '150%',
  5: '125%',
  6: '100%',
} as const;

export type ThemeConfig = Required<ThemeOpts> & {
  fontSizes: Required<Exclude<ThemeOpts['fontSizes'], undefined>>
};

export default class Theme {
  static makePalette = makePalette;
  readonly config: ThemeConfig;
  readonly styles: Styles;

  constructor(public readonly opts: ThemeOpts) {
    // predefined defaults
    const preConfig = {
      nav: opts.nav,
      palette: opts.palette,
      spacer: opts.spacer ?? 15,
      dimensions: opts.dimensions ?? {
        auto: 'auto',
        0: '0%',
        25: '25%',
        50: '50%',
        75: '75%',
        100: '100%',
      },
      borderWidths: opts.borderWidths ?? [0, 1, 2, 3, 4, 5],
      borderRadius: opts.borderRadius ?? [0, 1, 2, 3, 4, 5],
      fontFamilies: opts.fontFamilies,
      fontWeights: opts.fontWeights ?? ['normal'],
      fontStyles: opts.fontStyles ?? ['italic'],
      fontSizes: opts.fontSizes
        ? { ...defaultFontSizes,  ...opts.fontSizes }
        : defaultFontSizes,
      body: opts.body ?? { letterSpacing: 1.2 },
      headings: opts.headings ?? {},
    };

    // computed defaults
    this.config = {
      ...preConfig,
      spacers: opts.spacers ?? [0, .25, .5, 1, 1.5, 3]
        .map((v) => preConfig.spacer * v),
    };

    this.styles = {
      ...makeTypographyStyles(this.config),
      ...makeLayoutStyles(this.config),
    };
  }

  parseStyle(style: Style): ViewStyle | TextStyle | ImageStyle {
    const st: Style = { ...style };

    // font size pencentage
    if (
      'fontSize' in st
    && typeof st.fontSize === 'string'
    && st.fontSize.match(/^\d+%$/)
    ) {
      const { fontSizes: { base } } = this.config;
      const pct = Number(st.fontSize.replace('%', '')) / 100;
      st.fontSize = base * pct;
    }

    return st;
  }
};

