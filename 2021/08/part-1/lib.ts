const segmentNums = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
};

export function countNumberOfDigits(input: string): number {
  const digits: number[] = [];

  const lines = input.split('\n').filter((l) => !!l);
  for (const line of lines) {
    const [_, output] = line.split(' | ');
    output.split(' ').forEach((digit) => {
      const index = segmentNums[digit.length];
      if (index) {
        digits[index] = (digits[index] || 0) + 1;
      }
    });
  }

  return digits.reduce((acc, curr) => acc + (curr || 0), 0);
}
