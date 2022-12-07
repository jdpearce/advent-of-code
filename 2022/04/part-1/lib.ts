export type Range = [number, number];

export function doesOneRangeContainTheOther(input: string): boolean {
  const [r1, r2]: Range[] = input.split(',').map((x) => x.split('-').map(Number) as Range);
  return isRangeContained(r1, r2) || isRangeContained(r2, r1);
}

export function isRangeContained(r1: Range, r2: Range): boolean {
  return r1[0] <= r2[0] && r1[1] >= r2[1];
}

export function countContainedPairs(input: string): number {
  let sum = 0;
  input
    .split('\n')
    .filter((x) => x)
    .forEach((line) => {
      sum += doesOneRangeContainTheOther(line) ? 1 : 0;
    });
  return sum;
}
