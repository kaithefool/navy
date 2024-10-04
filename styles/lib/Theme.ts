import { Theme as NavTheme } from '@react-navigation/native';

import { Palette } from './palette';
import makeTypographyStyles, { TypographyOpts } from './typography';
import { Styles } from './utils';

export default class Theme {
  readonly styles: Styles;

  constructor(public opts: {
    palette: Palette;
    typography: TypographyOpts;
    nav: NavTheme,
  }) {
    this.styles = {
      ...makeTypographyStyles(opts.palette, opts.typography),
      //
    };
  }
};

