import { Palette } from './palette';
import makeTypographyStyles, { TypographyOpts } from './typography';
import { Styles } from './utils';

export default class Theme {
  readonly styles: Styles;

  constructor(public opts: {
    palette: Palette;
    typography: TypographyOpts;
  }) {
    this.styles = {
      ...makeTypographyStyles(opts.palette, opts.typography),
      //
    };
  }
};

