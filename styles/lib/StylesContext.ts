import { createContext } from 'react';
import Theme from './theme';
import { Style, StyParams } from './utils';
import { ThemeName } from '../config';

export type StylesContextType = {
  /**
   * Available themes
   */
  themes: { [s: string]: Theme };
  /**
   * Current theme
   */
  theme: Theme | null;
  setTheme: (name: ThemeName) => void;
  sty: (...s: StyParams) => Style;
};

export default createContext<StylesContextType>({
  themes: {},
  theme: null,
  setTheme: () => {},
  sty: () => ({}),
});