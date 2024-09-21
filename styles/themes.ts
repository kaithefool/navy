import makePalette, { Palette } from './lib/palette';

export const colors = {
  primary: '#0d6efd',
  secondary: '#6610f2',
  neutral: '#6c757d',

  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',
} as const;

export const palettes = {
  light: makePalette({
    themes: colors,
    grays: true,
  }),
  dark: makePalette({
    themes: colors,
    grays: true,
    invert: { grays: true },
  }),
} as const;

export type ThemeNames = keyof typeof palettes;
