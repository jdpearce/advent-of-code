import { magnitude, parsePairOrNumber, reduceSnailNumber } from '../part-1/lib';

export function getLargestMagnitudeSum(input: string): number {
  const snailNumbers = input
    .split('\n')
    .filter((l) => !!l)
    .map((line) => parsePairOrNumber(JSON.parse(line)));

  let largest = 0;

  for (let x = 0; x < snailNumbers.length; x++) {
    for (let y = 0; y < snailNumbers.length; y++) {
      if (x === y) {
        continue;
      }
      const m = magnitude(reduceSnailNumber({ left: snailNumbers[x], right: snailNumbers[y] }));
      if (m > largest) {
        largest = m;
      }
    }
  }

  return largest;
}
