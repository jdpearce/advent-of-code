import { countContainedPairs, doesOneRangeContainTheOther } from './lib';

describe('2022-12-04.1', () => {
  const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

  it('say if one range contains the other', () => {
    expect(doesOneRangeContainTheOther('2-4,6-8')).toBe(false);
    expect(doesOneRangeContainTheOther('2-8,3-7')).toBe(true);
  });

  it('should count the number of contained pairs', () => {
    expect(countContainedPairs(input)).toBe(2);
  });
});
