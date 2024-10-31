import chroma from 'chroma-js'

import grayscale, { GrayscaleOpts } from './grayscale'
import variants, { VariantsOpts } from './variants'
import { invertColorsLt } from './helpers'

export type Colors = {
  [s: string]: string
}

type ComponentColors = {
  body: string
  text: string
}

export default class Palette {
  colors: Colors & ComponentColors

  themes: Colors
  grays: Colors
  components: ComponentColors

  highlights: Colors
  contrasts: Colors
  // tones: Colors

  constructor({
    themes, grays, components = {},
    invert = false,
    highlight = 0.2,
  }: {
    themes: {
      primary: string | { color: string } & VariantsOpts
      [s: string]: string | { color: string } & VariantsOpts
    }
    grays?: GrayscaleOpts
    components?: { body?: string, text?: string }
    invert?: boolean

    highlight?: number
    contrastRatio?: number
  }) {
    this.themes = Object.assign({},
      ...Object.entries(themes).map(([k, v]) => {
        const color = typeof v === 'string' ? v : v.color

        return variants(k, color, { invert, ...typeof v !== 'string' && v })
      }))
    this.grays = grayscale({
      invert,
      hue: chroma(this.themes.primary).hsl()[0],
      ...grays,
    })
    this.components = {
      text: this.grays[`gray-${invert ? 1 : 9}00`],
      body: '#ffffff',
      ...components,
    }
    if (invert) this.components = invertColorsLt(this.components)

    this.colors = {
      ...this.themes,
      ...this.grays,
      ...this.components,
    }
    this.highlights = Object.fromEntries(
      Object.entries(this.colors).map(([k, v]) => (
        [k, chroma(v)[!invert ? 'darken' : 'brighten'](highlight).hex()]
      )),
    )
    this.contrasts = Object.fromEntries(
      Object.entries(this.colors).map(([k, v]) => {
        const colors = Object.values(this.components)
        const cf = colors.map(c => chroma.contrast(v, c))

        return [k, colors[cf.indexOf(Math.max(...cf))]]
      }),
    )
  }
}
