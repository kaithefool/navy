import chroma from 'chroma-js';

export type Palette = {
  [key: string]: string;
}

export const invert = (color: string): string => {
  const c = chroma(color);

  return c.set('hsl.l', 1 - c.luminance()).hex();
};

export const variants = (name: string, color: string, {
  base = 400,
  lightest = 100,
  darkest = 600,
  step = .2,
  tint = '#ffffff',
  shade  = '#000000',
} = {}): Palette => {
  const c = chroma(color);
  const output: Palette = { [name]: color };

  for (let i = lightest; i < darkest; i += 100) {
    let s = c;

    if (i < base) s = c.mix(tint, (base - i) * step / 100);
    if (i > base) s = c.mix(shade, (i - base) * step / 100);

    output[`${name}-${i}`] = s.hex();
  }

  return output;
};