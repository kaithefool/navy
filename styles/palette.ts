import type { Theme } from '@react-navigation/native';
import chroma from 'chroma-js';

const invert = (color: string): string => {
  const c = chroma(color);

  return c.set('hsl.l', 1 - c.luminance()).hex();
};

const palette = {
  primary: '#0d6efd',
  secondary: '#6610f2',
  neutral: '#6c757d',

  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',

  light: '#f8f9fa',
  dark: '#212529',

  background: '#ffffff',
  text: '#212529',
  border: '#dee2e6',
} as const;

export const theme = {
  light: { ...palette },
  dark: {
    ...palette,
    light: invert(palette.light),
    dark: invert(palette.dark),

    background: invert(palette.background),
    text: invert(palette.text),
    border: invert(palette.border),
  },
} as const;

export const getNavTheme = (name: 'light' | 'dark'): Theme => {
  return {
    dark: name === 'dark',
    colors: {
      primary: theme[name].primary,
      background: theme[name].background,
      card: theme[name].light,
      text: theme[name].text,
      border: theme[name].border,
      notification: theme[name].danger,
    },
  };
};