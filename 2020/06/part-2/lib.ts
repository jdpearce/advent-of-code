export function sumOfCounts(input: string): number {
  const groups = input.split('\n\n');

  return groups.reduce((prev, curr) => {
    return prev + numberOfQuestions(curr);
  }, 0);
}

export const intersection = (set: Set<string>, array: string[]) =>
  new Set(array.filter((x) => set.has(x)));

export function numberOfQuestions(group: string): number {
  let set = new Set<string>();

  const lines = group.split('\n').filter((x) => !!x);
  for (let i = 0; i < lines.length; i++) {
    const chars = lines[i].split('');
    if (i === 0) {
      chars.forEach((char) => set.add(char));
      continue;
    }

    set = intersection(set, chars);
  }

  return set.size;
}
