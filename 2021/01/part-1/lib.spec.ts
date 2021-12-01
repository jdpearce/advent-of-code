import { countIncreases } from './lib';

describe('2021-12-01.1', () => {
  const input = `199
200
208
210
200
207
240
269
260
263`;

  it('count increases in a sonar sweep', () => {
    const nums = input.split('\n').map(Number);
    expect(countIncreases(nums)).toBe(7);
  });
});
