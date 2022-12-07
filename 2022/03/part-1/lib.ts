export function getPriority(input: string): number {
  if (input.toUpperCase() === input) {
    return input.charCodeAt(0) - 38;
  }
  return input.charCodeAt(0) - 96;
}

export function getDuplicatedType(input: string): string {
  const midpoint = input.length / 2;
  const first = new Set(input.slice(0, midpoint));
  const last = new Set(input.slice(midpoint));
  return [...getIntersection(first, last).values()].join('');
}

export function getIntersection(first: Set<string>, last: Set<string>): Set<string> {
  return new Set([...first].filter((x) => last.has(x)));
}

export function calculateDuplicatePrioritySum(input: string): number {
  const lines = input.split('\n').filter((x) => x);
  let sum = 0;
  for (const line of lines) {
    sum += getPriority(getDuplicatedType(line));
  }
  return sum;
}
