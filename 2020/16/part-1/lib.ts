export interface ValidationRules {
  [name: string]: number[][];
}

export function getValidationRules(input: string): ValidationRules {
  const rules: ValidationRules = {};

  const lines = input.split('\n');
  for (const line of lines) {
    const parts = line.split(': ');
    const limits = parts[1].split(' or ');
    const [a, b] = limits[0].split('-').map(Number);
    const [c, d] = limits[1].split('-').map(Number);
    rules[parts[0]] = [
      [a, b],
      [c, d],
    ];
  }

  return rules;
}

export function inBounds(i: number, lower: number, upper: number): boolean {
  return i >= lower && i <= upper;
}

export function getInvalidNumbers(ticket: number[], rules: ValidationRules): number[] {
  const invalid: number[] = [];

  for (const i of ticket) {
    let found = false;
    for (const [name, limits] of Object.entries(rules)) {
      const [[a, b], [c, d]] = limits;
      if (inBounds(i, a, b) || inBounds(i, c, d)) {
        found = true;
      }
    }
    if (!found) {
      invalid.push(i);
    }
  }

  return invalid;
}

export function getSeparateBits(
  input: string
): { rules: ValidationRules; tickets: number[][]; mine: number[] } {
  const rulesInput = input.split('\n\n')[0];
  const ticketsInput = input.split('nearby tickets:\n')[1];
  const mineInput = input.split('your ticket:\n')[1].split('\n')[0];

  return {
    rules: getValidationRules(rulesInput),
    tickets: ticketsInput.split('\n').map((x) => x.split(',').map(Number)),
    mine: mineInput.split(',').map(Number),
  };
}

export function getSumInvalidNumbers(input: string): number {
  const bits = getSeparateBits(input);

  const invalid = [];

  for (const ticket of bits.tickets) {
    invalid.push(...getInvalidNumbers(ticket, bits.rules));
  }

  return invalid.reduce((acc, curr) => (acc += curr));
}
