import { calculateBestUseOfFuel, calculateBestUseOfFuel_BruteForce } from './lib';

describe('2021-12-07.2', () => {
  const input = `16,1,2,0,4,2,7,1,2,14`;

  it('calculate the best use of fuel', () => {
    expect(calculateBestUseOfFuel(input)).toBe(168);
  });

  it('calculate the best use of fuel (Brute Force)', () => {
    expect(calculateBestUseOfFuel_BruteForce(input)).toBe(168);
  });
});
