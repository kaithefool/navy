import chroma from 'chroma-js'
import { Colors } from './Palette'

export type VariantsOpts = {
  /**
   * Shade index which the base color will use.
   * @default 400
   */
  base?: number
  /**
   * Shade index of the lightest color.
   * @default 100
   */
  lightest?: number
  /**
   * Shade index of the darkest color.
   * @default 600
   */
  darkest?: number
  /**
   * Mix ratio intervals of shades and tints between variants
   * @default
   */
  step?: number
  /**
   * Color used to produce the tint mixture
   * @default '#ffffff''
   */
  tint?: string
  /**
   * Color used to produce the shade mixture
   * @default '#000000
   */
  shade?: string
  /**
   * Invert the lightness of the variants.
   * This will not change the base color.
   * @default false
   */
  invert?: boolean
}

/**
 * A function to generate color variants
 */
export default function variants(
  /**
   * Name of the color used as prefix
   */
  name: string,
  /**
   * The base color which the variants base on.
   */
  color: string,
  {
    base = 400,
    lightest = 100,
    darkest = 600,
    step = 0.2,
    tint = '#ffffff',
    shade = '#000000',
    invert = false,
  }: VariantsOpts = {},
) {
  const c = chroma(color)
  const output: Colors = { [name]: color }
  const ends = !invert ? [tint, shade] : [shade, tint]

  for (let i = lightest; i <= darkest; i += 100) {
    let s = c

    if (i < base) s = c.mix(ends[0], (base - i) * step / 100)
    if (i > base) s = c.mix(ends[1], (i - base) * step / 100)

    output[`${name}-${i}`] = s.hex()
  }

  return output
}
