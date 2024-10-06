import { Theme as NavTheme } from '@react-navigation/native';

import { Styles } from './utils';
import { Palette } from './palette';
import makeTypographyStyles, { TypographyOpts } from './typography';
import makeLayoutStyles from './layout';

export default class Theme {
  readonly styles: Styles;

  constructor(public readonly opts: {
    palette: Palette;
    typography: TypographyOpts;
    nav: NavTheme,
  }) {
    this.styles = {
      ...makeTypographyStyles(opts.palette, opts.typography),
      ...makeLayoutStyles(),
    };
  }
};

