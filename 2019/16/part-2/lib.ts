/**
 * Since the offset is likely to be large, that means
 * all the values before will be multiplied by zero
 * and all the values after multipled by 1,
 * so we can probably simplify the FFT
 *
 * @param input
 * @param offset
 */

export function calculateMessage(input: number[]): string {
  let output = [];
  let offset = Number(input.slice(0, 7).join(''));

  let full = [];
  for (let i = 0; i < 10000; i++) {
    full.push(...input);
  }
  output = full.slice(offset);

  for (let j = 0; j < 100; j++) {
    for (let i = output.length - 2; i >= 0; i--) {
      const digit = output[i] + output[i + 1];
      output[i] = Math.abs(digit) % 10;
    }
  }

  return output.slice(0, 8).join('');
}
