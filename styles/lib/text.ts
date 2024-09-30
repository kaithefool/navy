import { TextStyle } from 'react-native';
import { Palette } from './palette';
import { mapStyles } from './utils';

export type ThemeTextOpts = {
  palette: Palette;
  fontFamilies: { [s: string]: string };
  body?: TextStyle;
};

export default function makeTextStyles(palette: Palette, {
  fontFamilies,
  body,
  //
}: ThemeTextOpts) {
  return {
    ...mapStyles(palette, (v) => ({ color: v }), 'text'),
    ...mapStyles(fontFamilies, (v) => ({ fontFamily: v }), 'text'),
  };
}