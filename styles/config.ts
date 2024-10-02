import makePalette from './lib/palette';
import Theme from './lib/theme';

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

const makeTheme = (name: typeof themeNames[number]) => {
  const palette = makePalette({
    themes: colors,
    grays: true,
    invert: name === 'dark' && { grays: true },
  });

  return new Theme({
    palette,
    typography: {
      fontFamilies: ['noto-sans'],
      weights: { normal: 400, bold: 600 },
    },
  });
};

export const themes = Object.fromEntries(
  themeNames.map((n) => [n, makeTheme(n)]),
);
