import { createContext } from 'react';
import { Style, StyParams } from '../utils';
import { ThemeName, themeNames, themes } from '../../config';
import Theme from '../Theme';

export type StylesContextType = {
  /**
   * Available themes
   */
  themes: { [s: string]: Theme };
  /**
   * Current theme
   */
  theme: Theme;
  setTheme: (name: ThemeName) => void;
  sty: (...s: StyParams) => Style;
};

export default createContext<StylesContextType>({
  themes: {},
  theme: themes[themeNames[0]],
  setTheme: () => {},
  sty: () => ({}),
});