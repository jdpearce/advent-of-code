export function sumOfCounts(input: string): number {
  const groups = input.split('\n\n');

  return groups.reduce((prev, curr) => {
    return prev + numberOfQuestions(curr);
  }, 0);
}

export const intersection = (set1: Set<string>, set2: Set<string>) =>
  new Set([...set2].filter((x) => set1.has(x)));

export function numberOfQuestions(group: string): number {
  return group
    .split('\n')
    .filter((x) => x)
    .map((line) => new Set(line.split('')))
    .reduce((prev, curr) => {
      if (!prev) {
        return curr;
      }

      return intersection(prev, curr);
    }, null).size;
}
