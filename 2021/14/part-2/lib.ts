/**
 * We don't actually need to know the resulting polymer, just the counts of pairs
 *
 * Every iteration we count the insertions.
 *
 */
export function getNextStep(
  letterCounts: { [element: string]: number },
  pairCounts: { [pair: string]: number },
  rules: { [pair: string]: string }
): [{ [element: string]: number }, { [pair: string]: number }] {
  const nextCounts = {};

  let pairs = Object.keys(pairCounts);
  for (const pair of pairs) {
    const insertion = rules[pair];
    if (insertion) {
      letterCounts[insertion] = (letterCounts[insertion] || 0) + pairCounts[pair];
      const pair1 = `${pair[0]}${insertion}`;
      const pair2 = `${insertion}${pair[1]}`;
      nextCounts[pair1] = (nextCounts[pair1] || 0) + pairCounts[pair];
      nextCounts[pair2] = (nextCounts[pair2] || 0) + pairCounts[pair];
    }
  }

  return [letterCounts, nextCounts];
}

export function getPairCounts(
  starter: string[],
  rules: { [pair: string]: string }
): { [pair: string]: number } {
  const pairCounts: { [pair: string]: number } = {};

  let last = starter[0];
  for (let i = 1; i < starter.length; i++) {
    const pair = `${last}${starter[i]}`;
    if (rules[pair]) {
      pairCounts[pair] = (pairCounts[pair] || 0) + 1;
    }
    last = starter[i];
  }

  return pairCounts;
}

export function findMinMaxElementCounts(counts: { [element: string]: number }): [number, number] {
  const values = Object.values(counts);
  let min = values[0];
  let max = values[0];
  for (let i = 1; i < values.length; i++) {
    if (values[i] < min) {
      min = values[i];
    }
    if (values[i] > max) {
      max = values[i];
    }
  }

  return [min, max];
}

export function getInitialLetterCounts(starter: string[]): { [element: string]: number } {
  const counts: { [element: string]: number } = {};
  for (const element of starter) {
    counts[element] = (counts[element] || 0) + 1;
  }
  return counts;
}
