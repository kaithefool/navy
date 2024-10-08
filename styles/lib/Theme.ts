import { Theme as NavTheme } from '@react-navigation/native';

import { Styles } from './utils';
import { Palette } from './palette';
import makeTypographyStyles, { TypographyOpts } from './typography';
import makeLayoutStyles, { LayoutOpts } from './layout';

export default class Theme {
  readonly styles: Styles;

  constructor(public readonly opts: {
    palette: Palette;
    nav: NavTheme;
  }
    & TypographyOpts
    & LayoutOpts,
  ) {
    this.styles = {
      ...makeTypographyStyles(opts),
      ...makeLayoutStyles(opts),
    };
  }
};

