/**
 * Dynamic Programming (memoized) Recursive Solution
 *
 * This calculates the number of paths to the end
 * recursively. For every step that is <= 3 we do a calc.
 * Greater than that we just break out of the loop then
 * step up the tree and do it all again.
 *
 * There has to be a better way to do this though...
 *
 * @param numbers
 */
export function numberOfArrangements(numbers: number[]): number {
  const sorted = [...numbers];
  sorted.sort((a, b) => a - b);
  const adapters = [0, ...sorted, sorted[sorted.length - 1] + 3];

  const map = {};
  const calcPaths = (i: number) => {
    if (i === adapters.length - 1) {
      return 1;
    }

    if (map[i]) {
      return map[i];
    }

    let paths = 0;
    for (let j = i + 1; j < adapters.length; j++) {
      if (adapters[j] - adapters[i] <= 3) {
        paths += calcPaths(j);
      } else {
        break;
      }
    }
    map[i] = paths;
    return paths;
  };

  return calcPaths(0);
}

/**
 * This one assumes the tribonacci sequence holds, i.e.
 *
 * For consective sequences of numbers, the two end points are FIXED
 * Then for each sequence length:
 *
 * 1: There is one way to arrange them
 * 2: There is one way (because the end points are fixed)
 * 3: There are 2 ways, e.g. 1 2 3 -> 1 3 or 1 2 3
 * 4: There are 4 ways, e.g. 1 2 3 4 -> 1 4, 1 2 4, 1 3 4, 1 2 3 4
 * 5: There are 7 ways...
 *
 * Then to get the total number of ways, you just multiply these.
 *
 * @param numbers
 */
export function numberOfArrangements2(numbers: number[]): number {
  const adapters = [...numbers];
  adapters.sort((a, b) => a - b);
  const space = [0, ...adapters, adapters[adapters.length - 1] + 3];
  const tribonacci = [0, 1, 1, 2, 4, 7, 13, 24]; // assume there aren't sequences longer than 7

  let sequenceLength = 1;
  let arrangements = 1;
  for (let i = 1; i < space.length; i++) {
    if (space[i] === space[i - 1] + 1) {
      sequenceLength++;
    } else {
      arrangements *= tribonacci[sequenceLength];
      sequenceLength = 1;
    }
  }

  return arrangements;
}
