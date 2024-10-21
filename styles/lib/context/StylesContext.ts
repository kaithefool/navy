import { createContext } from 'react'
import { TextStyle, ViewStyle, ImageStyle } from 'react-native'
import { StyParams } from './helpers'
import { ThemeName, themeNames, themes } from '../../config'
import Theme from '../theme'

export type StylesContextType = {
  /**
   * Available themes
   */
  themes: { [s: string]: Theme }
  /**
   * Current theme
   */
  theme: Theme
  setTheme: (name: ThemeName) => void
  /**
   * A function to compose styles based on current theme.
   * Can be used as a regular function or a tag function with template literals.
   *
   * @param {...(string | Style)} styles - Style names or inline styles
   * @example
   * sty`text-primary fw-bold ${{ marginBottom: 2 }}`
   * @example
   * sty('text-${active ? 'primary' : 'gray'} fw-bold', { marginBottom: 2 })
   */
  sty: (...s: StyParams) => TextStyle | ViewStyle | ImageStyle
}

export default createContext<StylesContextType>({
  themes: themes,
  theme: themes[themeNames[0]],
  setTheme: () => {},
  sty: () => ({}),
})
