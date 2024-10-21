import chroma from 'chroma-js'

import { Colors } from './Palette'
import { invertLt } from './helpers'

export type GrayscaleOpts = {
  /**
   * Hue of color added to the grays
   * @default 210
   */
  hue?: number
  /**
   * Saturation of color added to the grays
   * @default .12
   */
  saturation?: number
  /**
   * Lightness intervals between the grays
   * @default .095
   */
  step?: number
  /**
   * The lightest lightness the gray intervals start with
   * @default .97
   */
  lightest?: number
  /**
   * Invert lightness.
   * @default false
   */
  invert?: boolean
}

/**
 * A function to generate gray color intervals
 */
export default function grayscale({
  hue = 210,
  saturation = 0.12,
  step = 0.099,
  lightest = 0.97,
  invert = false,
}: GrayscaleOpts = {}) {
  const output: Colors = {}

  for (let i = 0; i < 9; i += 1) {
    let c = chroma
      .hsl(hue, saturation, lightest - (i * step))
      .hex()
    if (invert) c = invertLt(c)
    output[`gray-${(i + 1) * 100}`] = c
  }

  return output
}
