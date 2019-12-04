/**
 * Tests whether the input matches given criteria for the password
 *
 * @param input Possible password
 */
export function matchesCriteria(input: string): boolean {
  // 1. must have two adjacent matching digits
  // 2. digits must increase/stay the same left to right

  const digits = input.split('').map(Number);
  let last = digits[0];
  let hasAdjacent = false;
  for (let i = 1; i < digits.length; i++) {
    let curr = digits[i];
    if (curr < last) {
      return false;
    }

    if (curr === last) {
      hasAdjacent = true;
    }

    last = curr;
  }

  return hasAdjacent;
}
