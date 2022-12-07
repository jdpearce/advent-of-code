import { Range } from '../part-1/lib';

export function doRangesOverlap(input: string): boolean {
  const [r1, r2]: Range[] = input.split(',').map((x) => x.split('-').map(Number) as Range);
  return !areRangesSeparate(r1, r2);
}

export function areRangesSeparate(r1: Range, r2: Range): boolean {
  return r2[0] > r1[1] || r1[0] > r2[1];
}

export function countOverlappingPairs(input: string): number {
  let sum = 0;
  input
    .split('\n')
    .filter((x) => x)
    .forEach((line) => {
      sum += doRangesOverlap(line) ? 1 : 0;
    });
  return sum;
}
