import { Palette } from './palette';
import makeTextStyles, { ThemeTypographyOpts } from './typography';
import { Style } from './utils';

export default class Theme {
  styles: { [s: string]: Style } = {};

  palette: Palette;
  typography: ThemeTypographyOpts;

  constructor({
    palette,
    typography,
  }: {
    palette: Palette;
    typography: ThemeTypographyOpts;
  }) {
    this.palette = palette;
    this.typography = typography;

    this.makeStyles();
  }

  makeStyles() {
    this.styles = {
      ...makeTextStyles(this.palette, this.typography),
      //
    };
  }
};

