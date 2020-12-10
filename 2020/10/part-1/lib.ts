export function calculateDistribution(numbers: number[]): { 1: number; 3: number } {
  const d = { 1: 0, 3: 0 };

  numbers.sort((a, b) => a - b);
  const deviceRating = numbers[numbers.length - 1] + 3;
  numbers = [0, ...numbers, deviceRating];

  for (let i = 1; i < numbers.length; i++) {
    const diff = numbers[i] - numbers[i - 1];
    d[diff]++;
  }

  return d;
}
