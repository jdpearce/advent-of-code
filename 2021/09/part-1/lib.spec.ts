import { calculateRiskLevelSum } from './lib';

describe('2021-12-09.1', () => {
  const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

  it('calculate risk level sum', () => {
    expect(calculateRiskLevelSum(input)).toBe(15);
  });
});
