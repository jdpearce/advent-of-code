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
