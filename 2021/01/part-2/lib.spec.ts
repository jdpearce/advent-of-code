import { countSlidingWindowIncreases } from './lib';

describe('2021-12-01.2', () => {
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

  it('three-measurement sliding window count increases in a sonar sweep', () => {
    const nums = input.split('\n').map(Number);
    expect(countSlidingWindowIncreases(nums, 3)).toBe(5);
  });
});
