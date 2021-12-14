export function getStarterAndRules(input: string): [string[], { [pair: string]: string }] {
  const [starter, ruleLines] = input.split('\n\n');
  const rules: { [pair: string]: string } = ruleLines
    .split('\n')
    .filter((l) => !!l)
    .map((l) => l.split(' -> '))
    .reduce((acc, [left, right]) => {
      acc[left] = right;
      return acc;
    }, {});
  return [starter.split(''), rules];
}

export function getNextStep(starter: string[], rules: { [pair: string]: string }): string[] {
  const next: string[] = [];

  let last = starter[0];
  next.push(last);
  for (let i = 1; i < starter.length; i++) {
    const currentPair = `${last}${starter[i]}`;
    const insertion = rules[currentPair];
    if (insertion) {
      next.push(insertion);
    }
    next.push(starter[i]);
    last = starter[i];
  }

  return next;
}

export function findMinMaxElementCounts(list: string[]): [number, number] {
  const counts: { [element: string]: number } = {};
  for (const element of list) {
    counts[element] = (counts[element] || 0) + 1;
  }

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
