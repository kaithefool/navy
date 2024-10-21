import { mapStyles } from './helpers'
import { Styles, ThemeConfig } from './Theme'

export default function makeTypographyStyles({
  palette,
  fontFamilies,
  fontWeights = ['normal'],
  fontStyles = ['italic'],
  fontSizes,
  body = {},
  headings = {},
}: ThemeConfig): Styles {
  return {
    // default text style
    text: {
      color: palette.components.text,
      fontSize: fontSizes.base,
      ...body,
    },

    ...mapStyles(palette.colors, v => ({ color: v }), 'text'),
    ...mapStyles(fontFamilies, v => ({ fontFamily: v }), 'font'),
    ...mapStyles(fontWeights, v => ({ fontWeight: v }), 'fw'),
    ...mapStyles(fontStyles, v => ({ fontStyle: v }), 'fst'),
    ...mapStyles(fontSizes, v => ({ fontSize: v }), 'fs'),
    ...mapStyles(
      ['auto', 'left', 'right', 'center', 'justify'] as const,
      v => ({ textAlign: v }),
      'text',
    ),
    ...mapStyles(
      { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 } as const,
      v => ({ fontSize: fontSizes[v], ...headings }),
    ),
  }
}
