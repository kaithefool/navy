import { Palette } from './palette';
import { mapStyles } from './utils';

export type LayoutOpts = {
  palette: Palette;
  spacer?: number;
  steps?: number[];
}

export default function makeLayoutStyles({
  palette,
  spacer = 1.5,
  steps = [0, .25, .5, 1, 1.5, 3],
}: LayoutOpts) {
  const gaps = steps.reduce<{ [n: number]: number }>(
    (a, v, i) => ({ ...a, [i]: v * spacer }), {},
  );
  const gapsWithAuto = { ...gaps, auto: 'auto' } as const;
  const dimensions = {
    auto: 'auto',
    0: '0%',
    25: '25%',
    50: '50%',
    75: '75%',
    100: '100%',
  } as const;

  return {
    ...mapStyles(palette, ((v) => ({ backgroundColor: v })), 'bg'),

    ...mapStyles(gaps, ((v) => ({ padding: v })), 'p'),
    ...mapStyles(gaps, ((v) => ({ paddingTop: v })), 'pt'),
    ...mapStyles(gaps, ((v) => ({ paddingBottom: v })), 'pb'),
    ...mapStyles(gaps, ((v) => ({ paddingLeft: v })), 'pl'),
    ...mapStyles(gaps, ((v) => ({ paddingRight: v })), 'pr'),
    ...mapStyles(gaps, ((v) => ({ paddingHorizontal: v })), 'px'),
    ...mapStyles(gaps, ((v) => ({ paddingVertical: v })), 'py'),

    ...mapStyles(gapsWithAuto, ((v) => ({ margin: v })), 'm'),
    ...mapStyles(gapsWithAuto, ((v) => ({ marginTop: v })), 'mt'),
    ...mapStyles(gapsWithAuto, ((v) => ({ marginBottom: v })), 'mb'),
    ...mapStyles(gapsWithAuto, ((v) => ({ marginLeft: v })), 'ml'),
    ...mapStyles(gapsWithAuto, ((v) => ({ marginRight: v })), 'mr'),
    ...mapStyles(gapsWithAuto, ((v) => ({ marginHorizontal: v })), 'mx'),
    ...mapStyles(gapsWithAuto, ((v) => ({ marginVertical: v })), 'my'),

    ...mapStyles(gaps, ((v) => ({ gap: v })), 'gap'),
    ...mapStyles(gaps, ((v) => ({ rowGap: v })), 'row-gap'),
    ...mapStyles(gaps, ((v) => ({ columnGap: v })), 'col-gap'),
    ...mapStyles([0, 1, 2, 3, 4, 5], ((v) => ({ flexGrow: v })), 'grow'),
    ...mapStyles([0, 1, 2, 3, 4, 5], ((v) => ({ flexShrink: v })), 'shrink'),
    ...mapStyles(
      ['wrap', 'nowrap', 'wrap-reverse'] as const,
      ((v) => ({ flexWrap: v })),
    ),
    ...mapStyles({
      row: 'row',
      'row-reverse': 'row-reverse',
      col: 'column',
      'col-reverse': 'column-reverse',
    } as const, ((v) => ({ flexDirection: v, gap: spacer }))),
    ...mapStyles({
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      baseline: 'baseline',
    } as const, ((v) => ({ alignItems: v })), 'align-items'),
    ...mapStyles({
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      baseline: 'baseline',
    } as const, ((v) => ({ alignSelf: v })), 'align-self'),
    ...mapStyles({
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    } as const, ((v) => ({ alignContent: v })), 'align-content'),
    ...mapStyles({
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    } as const, ((v) => ({ justifyContent: v })), 'justify-content'),

    fill: { width: '100%', height: '100%' },
    ...mapStyles(dimensions, ((v) => ({ height: v })), 'h'),
    ...mapStyles(dimensions, ((v) => ({ width: v })), 'w'),
    ...mapStyles(dimensions, ((v) => ({ maxHeight: v })), 'mah'),
    ...mapStyles(dimensions, ((v) => ({ maxWidth: v })), 'maw'),
    ...mapStyles(dimensions, ((v) => ({ minHeight: v })), 'mih'),
    ...mapStyles(dimensions, ((v) => ({ minWidth: v })), 'miw'),
  };
}