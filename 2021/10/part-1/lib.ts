const syntaxScore = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const closers = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

export function getFileSyntaxScore(input: string): number {
  const lines = input
    .split('\n')
    .filter((l) => !!l)
    .map((line) => line.split(''));
  return lines.reduce((acc, curr) => (acc += getSyntaxScore(curr)), 0);
}

export function getSyntaxScore(line: string[]): number {
  const open = [];
  for (const char of line) {
    if (open.length === 0 && closers[char]) {
      open.push(char);
      continue;
    }

    const last = open[open.length - 1];
    if (char === closers[last]) {
      open.pop();
      continue;
    }

    if (closers[char]) {
      open.push(char);
      continue;
    }

    return syntaxScore[char];
  }

  return 0;
}
