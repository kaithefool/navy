import chroma from 'chroma-js';

export type Palette = {
  [name: string]: string;
};

/**
 * A function to invert the lightness of color
 * without changing its hue and saturation
 */
export const invertLt = (color: string): string => {
  const c = chroma(color);

  return c.set('hsl.l', 1 - c.luminance()).hex();
};

/**
 * A function to invert all colors within the palette object
 */
export const invertPaletteLt = (p: Palette) => (
  Object.fromEntries(Object.entries(p).map(([k, v]) => (
    [k, invertLt(v)]
  )))
);

export type VariantsOpts = {
  /**
   * The base color which the variants base on.
   */
  color: string;
  /**
   * Shade index which the base color will use.
   * @default 400
   */
  base?: number;
  /**
   * Shade index of the lightest color.
   * @default 100
   */
  lightest?: number;
  /**
   * Shade index of the darkest color.
   * @default 600
   */
  darkest?: number;
  /**
   * Mix ratio intervals of shades and tints between variants
   * @default
   */
  step?: number;
  /**
   * Color used to produce the tint mixture
   * @default '#ffffff''
   */
  tint?: string;
  /**
   * Color used to produce the shade mixture
   * @default '#000000
   */
  shade?: string;
}

/**
 * A function to generate color variants
 */
export const variants = (
  /**
   * Name of the color used as prefix
   */
  name: string,
  {
    color,
    base = 400,
    lightest = 100,
    darkest = 600,
    step = .2,
    tint = '#ffffff',
    shade = '#000000',
  }: VariantsOpts,
): Palette => {
  const c = chroma(color);
  const output: Palette = { [name]: color };

  for (let i = lightest; i <= darkest; i += 100) {
    let s = c;

    if (i < base) s = c.mix(tint, (base - i) * step / 100);
    if (i > base) s = c.mix(shade, (i - base) * step / 100);

    output[`${name}-${i}`] = s.hex();
  }

  return output;
};

export type GrayscaleOpts = {
  /**
   * Hue of color added to the gray
   * @default 210
   */
  hue?: number,
  /**
   * Saturation of color added to the gray
   * @default .12
   */
  saturation?: number,
  /**
   * Lightness intervals between the grays
   * @default .095
   */
  step?: number,
  /**
   * The lightest lightness the gray intervals start with
   * @default .97
   */
  lightest?: number,
  /**
   * Invert lightness.
   * @default false
   */
  invert?: boolean,
};

/**
 * A function to generate gray color intervals
 */
export const grayscale = ({
  hue = 210,
  saturation = .12,
  step = .099,
  lightest = .97,
  invert = false,
}: GrayscaleOpts = {}): Palette => {
  const output: Palette = {};

  for (let i = 0; i < 9; i += 1) {
    let c = chroma
      .hsl(hue, saturation, lightest - (i * step))
      .hex();
    if (invert) c = invertLt(c);
    output[`gray-${(i + 1) * 100}`] = c;
  }

  return output;
};

type InvertOpts = {
  themes?: boolean | {
    [color: string]: boolean;
  };
  grays?: boolean;
};

/**
 * A function to generate color palette
 */
export const palette = ({
  themes = false,
  grays = false,
  invert = false,
}: {
  /**
   * Theme color options
   */
  themes?: { [key: string]: string | VariantsOpts } | false,
  /**
   * Grayscale options
   */
  grays?: GrayscaleOpts | boolean,
  invert?: InvertOpts | boolean,
}): Palette => {
  const output: Palette = {};

  // options defaults
  const themesOpts = themes === false ? {} : themes;
  const graysOpts = grays === true ? {} : grays;
  const invertOpts = typeof invert === 'boolean'
    ? { themes: invert, grays: invert } : invert;

  // theme colors
  if (themesOpts) {
    Object.assign(
      output,
      ...Object.entries(themesOpts).map(([k, v]) => {
        let vari = variants(k, typeof v === 'string' ? { color: v } : v);

        // color specified invert option
        if (
          invertOpts.themes
          && !(typeof invertOpts.themes === 'object' && !invertOpts.themes[k])
        ) {
          vari = invertPaletteLt(vari);
        }

        return vari;
      }),
    );
  }

  // grays
  if (graysOpts) {
    let gs = grayscale({
      ...output.primary
        ? { hue: chroma(output.primary).hsl()[0] } : {},
      ...graysOpts,
    });

    if (invertOpts.grays) gs = invertPaletteLt(gs);

    Object.assign(output, gs);
  }

  return output;
};

export default palette;