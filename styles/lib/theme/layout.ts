import { arrayToNumKeyObj, mapStyles } from './helpers'
import { Styles, ThemeConfig } from './Theme'

export default function makeLayoutStyles({
  palette,
  spacer,
  spacers,
  dimensions,
  borderWidths,
  borderRadius,
}: ThemeConfig): Styles {
  const sp = arrayToNumKeyObj(spacers)
  const spWiAuto = { ...sp, auto: 'auto' } as const
  const bw = arrayToNumKeyObj(borderWidths)
  const br = arrayToNumKeyObj(borderRadius)

  return {
    ...mapStyles(palette.colors, v => ({ backgroundColor: v }), 'bg'),
    ...mapStyles(palette.highlights, v => ({ backgroundColor: v }), 'bg', 'highlight'),
    ...mapStyles(palette.contrasts, v => ({ backgroundColor: v }), 'bg', 'contrast'),

    ...mapStyles(palette.colors, v => ({ borderColor: v }), 'border'),
    ...mapStyles(palette.colors, v => ({ borderTopColor: v }), 'border-top'),
    ...mapStyles(palette.colors, v => ({ borderBottomColor: v }), 'border-bottom'),
    ...mapStyles(palette.colors, v => ({ borderLeftColor: v }), 'border-left'),
    ...mapStyles(palette.colors, v => ({ borderRightColor: v }), 'border-right'),
    ...mapStyles(bw, v => ({ borderWidth: v }), 'border'),
    ...mapStyles(bw, v => ({ borderTopWidth: v }), 'border-top'),
    ...mapStyles(bw, v => ({ borderBottomWidth: v }), 'border-bottom'),
    ...mapStyles(bw, v => ({ borderLeftWidth: v }), 'border-left'),
    ...mapStyles(bw, v => ({ borderRightWidth: v }), 'border-right'),
    ...mapStyles(br, v => ({ borderRadius: v }), 'rounded'),
    ...mapStyles(br, v => ({ borderTopLeftRadius: v }), 'rounded-top-left'),
    ...mapStyles(br, v => ({ borderTopRightRadius: v }), 'rounded-top-right'),
    ...mapStyles(br, v => ({ borderBottomRightRadius: v }), 'rounded-bottom-right'),
    ...mapStyles(br, v => ({ borderBottomRightRadius: v }), 'rounded-bottom-left'),

    ...mapStyles(spWiAuto, v => ({ padding: v }), 'p'),
    ...mapStyles(spWiAuto, v => ({ paddingTop: v }), 'pt'),
    ...mapStyles(spWiAuto, v => ({ paddingBottom: v }), 'pb'),
    ...mapStyles(spWiAuto, v => ({ paddingLeft: v }), 'pl'),
    ...mapStyles(spWiAuto, v => ({ paddingRight: v }), 'pr'),
    ...mapStyles(spWiAuto, v => ({ paddingHorizontal: v }), 'px'),
    ...mapStyles(spWiAuto, v => ({ paddingVertical: v }), 'py'),

    ...mapStyles(spWiAuto, v => ({ margin: v }), 'm'),
    ...mapStyles(spWiAuto, v => ({ marginTop: v }), 'mt'),
    ...mapStyles(spWiAuto, v => ({ marginBottom: v }), 'mb'),
    ...mapStyles(spWiAuto, v => ({ marginLeft: v }), 'ml'),
    ...mapStyles(spWiAuto, v => ({ marginRight: v }), 'mr'),
    ...mapStyles(spWiAuto, v => ({ marginHorizontal: v }), 'mx'),
    ...mapStyles(spWiAuto, v => ({ marginVertical: v }), 'my'),

    ...mapStyles(sp, v => ({ gap: v }), 'gap'),
    ...mapStyles(sp, v => ({ rowGap: v }), 'row-gap'),
    ...mapStyles(sp, v => ({ columnGap: v }), 'col-gap'),
    ...mapStyles([0, 1, 2, 3, 4, 5], v => ({ flexGrow: v }), 'grow'),
    ...mapStyles([0, 1, 2, 3, 4, 5], v => ({ flexShrink: v }), 'shrink'),
    ...mapStyles(
      ['wrap', 'nowrap', 'wrap-reverse'] as const,
      v => ({ flexWrap: v }),
    ),
    ...mapStyles({
      'row': 'row',
      'row-reverse': 'row-reverse',
      'col': 'column',
      'col-reverse': 'column-reverse',
    } as const, v => ({ flexDirection: v, gap: spacer })),
    ...mapStyles({
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      baseline: 'baseline',
    } as const, v => ({ alignItems: v }), 'align-items'),
    ...mapStyles({
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      baseline: 'baseline',
    } as const, v => ({ alignSelf: v }), 'align-self'),
    ...mapStyles({
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    } as const, v => ({ alignContent: v }), 'align-content'),
    ...mapStyles({
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    } as const, v => ({ justifyContent: v }), 'justify-content'),

    fill: { width: '100%', height: '100%' },
    ...mapStyles(dimensions, v => ({ height: v }), 'h'),
    ...mapStyles(dimensions, v => ({ width: v }), 'w'),
    ...mapStyles(dimensions, v => ({ maxHeight: v }), 'mah'),
    ...mapStyles(dimensions, v => ({ maxWidth: v }), 'maw'),
    ...mapStyles(dimensions, v => ({ minHeight: v }), 'mih'),
    ...mapStyles(dimensions, v => ({ minWidth: v }), 'miw'),
  }
}
