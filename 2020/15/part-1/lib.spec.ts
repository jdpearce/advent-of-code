import { calculateNumberOnTurn } from './lib';

describe('2020-12-15.1', () => {
  it('should calculate the nth output', () => {
    expect(calculateNumberOnTurn([0, 3, 6], 4)).toBe(0);
    expect(calculateNumberOnTurn([0, 3, 6], 5)).toBe(3);
    expect(calculateNumberOnTurn([1, 3, 2], 2020)).toBe(1);
    expect(calculateNumberOnTurn([2, 1, 3], 2020)).toBe(10);
    expect(calculateNumberOnTurn([3, 1, 2], 2020)).toBe(1836);
  });
});
