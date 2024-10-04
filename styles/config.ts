import makePalette from './lib/palette';
import Theme from './lib/Theme';

export const colors = {
  primary: '#0d6efd',
  secondary: '#6610f2',
  neutral: '#6c757d',

  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',
} as const;

export const themeNames = [
  'light',
  'dark',
] as const;

export type ThemeName = typeof themeNames[number];

const makeTheme = (name: ThemeName) => {
  const dark = name === 'dark';
  const palette = makePalette({
    themes: colors,
    grays: true,
    invert: dark && { grays: true },
  });

  return new Theme({
    palette,
    nav: {
      dark,
      colors: {
        primary: palette.primary,
        background: palette.body,
        card: palette['gray-100'],
        text: palette['gray-900'],
        border: palette['gray-200'],
        notification: palette.danger,
      },
    },
    typography: {
      fontFamilies: ['noto-sans'],
      weights: { normal: 400, bold: 600 },
    },
  });
};

export const themes = Object.fromEntries(
  themeNames.map((n) => [n, makeTheme(n)]),
);
