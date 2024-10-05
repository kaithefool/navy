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
  /**
   * A function to compose styles based on current theme.
   * Can be used as a regular function or a tag function with template laterals.
   *
   * @param {...(string | Style)} styles - Style names or inline styles
   * @example
   * sty`text-primary fw-bold ${{ marginBottom: 2 }}`
   * @example
   * sty('text-primary fw-bold', { marginBottom: 2 })
   */
  sty: (...s: StyParams) => Style;
};

export default createContext<StylesContextType>({
  themes: themes,
  theme: themes[themeNames[0]],
  setTheme: () => {},
  sty: () => ({}),
});