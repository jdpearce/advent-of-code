import { getInvalidNumbers, getSeparateBits, inBounds, ValidationRules } from '../part-1/lib';

export function getValidTickets(tickets: number[][], rules: ValidationRules): number[][] {
  const valid: number[][] = [];

  for (const ticket of tickets) {
    const invalid = getInvalidNumbers(ticket, rules);
    if (invalid.length === 0) {
      valid.push(ticket);
    }
  }

  return valid;
}

/**
 * I'm pretty sure this wouldn't work if I had to make guesses (a la sudoku)
 * I was probably lucky with the input.
 *
 * I might refactor this to be a bit more readable and shorter later on.
 *
 * @param input
 */
export function identifyFields(input: string): Map<string, number> {
  const bits = getSeparateBits(input);
  bits.tickets = getValidTickets(bits.tickets, bits.rules);

  const fields: [string, number[]][] = [];

  for (const [name, limits] of Object.entries(bits.rules)) {
    const [[a, b], [c, d]] = limits;

    const possibles = new Set<number>();
    const mismatch = new Set<number>();

    // check each position in each ticket against this rule
    for (const ticket of bits.tickets) {
      for (let i = 0; i < ticket.length; i++) {
        if (!mismatch.has(i) && (inBounds(ticket[i], a, b) || inBounds(ticket[i], c, d))) {
          possibles.add(i);
        } else {
          // add to mismatch remove from possibles
          mismatch.add(i);
          possibles.delete(i);
        }
      }
    }

    fields.push([name, [...possibles.keys()]]);
  }

  const fieldMap = new Map<string, number>();
  const set = new Set();

  let changing = false;
  do {
    changing = false;
    for (let i = 0; i < fields.length; i++) {
      const [name, possibles] = fields[i];
      if (fieldMap.has(name)) {
        continue;
      }

      if (possibles.length === 1) {
        // lock in this position
        fieldMap.set(name, possibles[0]);
        set.add(possibles[0]);
        continue;
      }

      const newPossibles = [];

      for (const p of possibles) {
        if (!set.has(p)) {
          newPossibles.push(p);
        }
      }

      fields[i][1] = newPossibles;
      changing = true;
    }
  } while (changing);

  return fieldMap;
}
