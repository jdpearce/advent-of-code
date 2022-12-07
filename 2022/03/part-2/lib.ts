import { getIntersection, getPriority } from '../part-1/lib';

export function getBadge(input: string[]): string {
  if (input.length !== 3) {
    throw new Error('Something went wrong.');
  }

  const firstAndSecond = getIntersection(new Set(input[0]), new Set(input[1]));
  const all = getIntersection(firstAndSecond, new Set(input[2]));

  return [...all.values()].join('');
}

export function getSumOfPriorities(input: string): number {
  const lines = input.split('\n').filter((x) => x);
  const buffer = [];
  let sum = 0;
  for (const line of lines) {
    buffer.push(line);
    if (buffer.length === 3) {
      const badge = getBadge(buffer);
      sum += getPriority(badge);
      buffer.length = 0;
    }
  }
  return sum;
}
