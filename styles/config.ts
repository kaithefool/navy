import Palette from './lib/palette'
import Theme from './lib/theme'

export const themeNames = [
  'light',
  'dark',
] as const

export type ThemeName = typeof themeNames[number]

const makeTheme = (name: ThemeName) => {
  const dark = name === 'dark'
  const palette = new Palette({
    themes: {
      primary: '#0d6efd',
      secondary: '#6610f2',
      neutral: '#6c757d',

      success: '#198754',
      info: '#0dcaf0',
      warning: '#ffc107',
      danger: '#dc3545',
    },
    invert: dark,
  })
  const { colors } = palette

  return new Theme({
    palette,
    nav: {
      dark,
      colors: {
        primary: colors.primary,
        background: colors.body,
        card: colors['gray-100'],
        text: colors['gray-900'],
        border: colors['gray-200'],
        notification: colors.danger,
      },
    },
    fontFamilies: ['noto-sans'],
    fontWeights: { normal: 400, bold: 600 },
    body: {
      fontFamily: 'noto-sans',
      letterSpacing: 0.6,
    },
    headings: { fontWeight: 'bold' },
  })
}

export const themes = Object.fromEntries(
  themeNames.map(n => [n, makeTheme(n)]),
)
