export function sumOfCounts(input: string): number {
  const groups = input.split('\n\n');

  return groups.reduce((prev, curr) => {
    return prev + numberOfQuestions(curr);
  }, 0);
}

export function numberOfQuestions(group: string): number {
  const set = new Set();

  group.split('\n').forEach((line) =>
    line.split('').forEach((char) => {
      set.add(char);
    })
  );

  return set.size;
}
