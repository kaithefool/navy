import chroma from 'chroma-js'
import { Colors } from './Palette'

/**
 * A function to invert the lightness of color
 * without changing its hue and saturation
 */
export const invertLt = (color: string): string => {
  const c = chroma(color)

  return c.set('hsl.l', 1 - c.luminance()).hex()
}

/**
 * A function to invert all colors within the colors object
 */
export const invertColorsLt = <T extends Colors>(c: T): { [P in keyof T]: string } => {
  const e = Object.entries(c).map(([k, v]) => (
    [k, invertLt(v)]
  ))

  return Object.fromEntries(e)
}
