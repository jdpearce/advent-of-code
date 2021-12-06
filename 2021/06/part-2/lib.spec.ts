import { calculateNumberOfFish, calculateState } from './lib';

describe('2021-12-06.2', () => {
  const input = `3,4,3,1,2`;

  it('calculate lantern fish state after large number of days', () => {
    const state = calculateState(input, 256);
    expect(calculateNumberOfFish(state)).toBe(26984457539);
  });

  it('should work for the previous case', () => {
    const state = calculateState(input, 80);
    expect(calculateNumberOfFish(state)).toBe(5934);
  });
});
