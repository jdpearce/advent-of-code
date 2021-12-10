import { getSyntaxScore } from '../part-1/lib';

const completionScore = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const closers = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

/**
 * This could absolutely be optimised to not parse each uncorrupted
 * line twice, but I can't be bothered right now 😴
 */
export function getFileCompletionMiddleScore(input: string): number {
  const uncorrupted = input
    .split('\n')
    .filter((l) => !!l)
    .map((line) => line.split(''))
    .filter((line) => getSyntaxScore(line) === 0);

  const scores = uncorrupted.map((line) => getCompletionScore(line));

  scores.sort((a, b) => a - b);

  return scores[(scores.length - 1) / 2];
}

export function getCompletionScore(line: string[]): number {
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
  }

  return open
    .reverse()
    .map((char) => closers[char])
    .reduce((acc, curr) => acc * 5 + completionScore[curr], 0);
}
