import { StyleSheet } from 'react-native';
import { getPalette, ThemeName } from './theme';

export default (theme: ThemeName) => {
  const palette = getPalette(theme);

  return StyleSheet.create({
    't-primary': { color: palette.primary },
    't-secondary': { color: palette.secondary },
    't-neutral': { color: palette.neutral },
  });
};