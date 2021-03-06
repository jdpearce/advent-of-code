/**
 * Tests whether the input matches given criteria for the password
 *
 * @param input Possible password
 */
export function matchesNewCriteria(input: string): boolean {
  // 1. must have two adjacent matching digits
  // 2. digits must increase/stay the same left to right
  // 3. adjacent matching digits must be part of a longer string of matchin digits

  const digits = input.split('').map(Number);
  let last = digits[0];
  let matchGroupLength = 1;
  let hasAdjacent = false;
  for (let i = 1; i < digits.length; i++) {
    let curr = digits[i];
    if (curr < last) {
      return false;
    }

    if (curr === last) {
      matchGroupLength++;
    } else {
      hasAdjacent = hasAdjacent || matchGroupLength === 2;
      matchGroupLength = 1;
    }

    last = curr;
  }

  return hasAdjacent || matchGroupLength === 2;
}
