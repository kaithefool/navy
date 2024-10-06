import { mapStyles } from './utils';

export type LayoutOpts = {
  gaps: number[],
}

export default function makeLayoutStyles({
  gaps = [1, 2, 3, 4, 5, 6],
  //
}: LayoutOpts) {
  return {
    ...mapStyles(gaps, ((v) => ({ gap: v })), 'gap'),
    ...mapStyles(gaps, ((v) => ({ rowGap: v })), 'row-gap'),
    ...mapStyles(gaps, ((v) => ({ columnGap: v })), 'col-gap'),
    ...mapStyles({
      row: 'row',
      'row-reverse': 'row-reverse',
      col: 'column',
      'col-reverse': 'column-reverse',
    } as const, ((v) => ({ flexDirection: v }))),
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
  };
}