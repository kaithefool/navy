import type { Theme } from '@react-navigation/native';
import chroma from 'chroma-js';

const invert = (color: string): string => {
  const c = chroma(color as string);

  return c.set('hsl.l', 1 - c.luminance()).hex();
};

export const palette = {
  primary: '#0d6efd',
  secondary: '#1f1e22',
  neutral: '#6c757d',

  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',

  light: '#f8f9fa',
  dark: '#212529',

  bg: '#ffffff',
  text: '#212529',
  border: '#dee2e6',
} as const;

export const themes = {
  light: { ...palette },
  dark: {
    ...palette,
    light: invert(palette.light),
    dark: invert(palette.dark),

    background: invert(palette.bg),
    text: invert(palette.text),
    border: invert(palette.border),
  },
} as const;

export type ThemeName = keyof typeof themes;

export const getPalette = (theme: ThemeName) => {
  return themes[theme];
};

export const getNavTheme = (theme: ThemeName): Theme => {
  const p = getPalette(theme);

  return {
    dark: theme === 'dark',
    colors: {
      primary: p.primary,
      background: p.bg,
      card: p.light,
      text: p.text,
      border: p.border,
      notification: p.danger,
    },
  };
};