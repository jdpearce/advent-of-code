export function getEncodingSet(input: number[]): Set<number> {
  const set = new Set<number>();
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      set.add(input[i] + input[j]);
    }
  }
  return set;
}

export function isValid(input: number[], index: number, length: number): boolean {
  const set = getEncodingSet(input.slice(index - length, index));
  return set.has(input[index]);
}

export function findFirstInvalidNumber(input: string, length: number): number {
  const numbers = input.split('\n').map(Number);
  for (let i = length; i < numbers.length; i++) {
    if (!isValid(numbers, i, length)) {
      return numbers[i];
    }
  }

  throw new Error('oops');
}
