import { calculatePowerConsumption } from './lib';

describe('2021-12-03.1', () => {
  const input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

  it('should calculate the power consumption', () => {
    expect(calculatePowerConsumption(input)).toBe(198);
  });
});
