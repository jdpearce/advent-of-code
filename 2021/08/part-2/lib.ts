/**
 * Use 1, 4, 7 as masks to determine the other numbers:
 *
 * 0 shares:
 *   2 in common with 1
 *   3 in common with 4
 *   3 in common with 7
 *
 * 2 shares:
 *   1 in common with 1
 *   2 in common with 4
 *   2 in common with 7
 *
 * 3 shares:
 *   2 in common with 1
 *   3 in common with 4
 *   3 in common with 7
 *
 * 5 shares:
 *   1 in common with 1
 *   3 in common with 4
 *   2 in common with 7
 *
 * 6 shares:
 *   1 in common with 1
 *   3 in common with 4
 *   2 in common with 7
 *
 * 9 shares:
 *   2 in common with 1
 *   4 in common with 4
 *   3 in common with 7
 */

// maps number of segments used back to a unique number
const segmentNums = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
};

export function calculateOutputSum(input: string): number {
  let total = 0;

  const lines = input.split('\n').filter((l) => !!l);
  for (const line of lines) {
    const [digits, output] = line.split(' | ').map((x) => x.split(' '));

    const numbers = [];
    digits.forEach((digit) => {
      const index = segmentNums[digit.length];
      if (index) {
        numbers[index] = digit;
      }
    });

    let numberString = '';
    output.forEach((digit) => {
      switch (digit.length) {
        case 2:
          numberString += '1';
          break;
        case 3:
          numberString += '7';
          break;
        case 4:
          numberString += '4';
          break;
        case 5:
          // could be 2, 3, or 5
          if (overlap(digit, numbers[4]) === 2) {
            numberString += '2';
          } else if (overlap(digit, numbers[7]) === 3) {
            numberString += '3';
          } else {
            numberString += '5';
          }
          break;
        case 6:
          // could be 0, 6 or 9
          if (overlap(digit, numbers[1]) === 1) {
            numberString += '6';
          } else if (overlap(digit, numbers[4]) === 4) {
            numberString += '9';
          } else {
            numberString += '0';
          }
          break;
        case 7:
          numberString += '8';
          break;
      }
    });

    total += Number(numberString);
  }

  return total;
}

export const overlap = (str1: string, str2: string): number => {
  return intersection(new Set([...str1]), new Set([...str2])).size;
};

export const intersection = (set1: Set<string>, set2: Set<string>) =>
  new Set([...set2].filter((x) => set1.has(x)));
