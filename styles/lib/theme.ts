import { Palette } from './palette';
import makeTextStyles, { ThemeTextOpts } from './text';
import { Style } from './utils';

export class Theme {
  styles: { [s: string]: Style } = {};

  palette: Palette;
  text: ThemeTextOpts;

  constructor({
    palette,
    text,
  }) {
    this.palette = palette;
    this.text = text;

  }

  makeStyles() {
    this.styles = {
      ...makeTextStyles(this.palette, this.text),
      //
    };
  }
};

