export function calculatePowerConsumption(input: string): number {
  const lines = input.split('\n');

  /**
   * The total number of bits is lines.length
   * so if we count the ones, the number of zeroes
   * is lines.length - number of ones
   */
  const ones: number[] = lines.reduce((acc, curr) => {
    [...curr].forEach((value, index) => (acc[index] = (acc[index] || 0) + +value));
    return acc;
  }, []);

  const gammaBits = ones.map((count) => (count > lines.length / 2 ? 1 : 0));
  const epsilonBits = ones.map((count) => (count > lines.length / 2 ? 0 : 1));

  return parseInt(gammaBits.join(''), 2) * parseInt(epsilonBits.join(''), 2);
}
