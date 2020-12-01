import { findThreeNumbersSummingTo } from './lib';

describe('2020-12-01.2', () => {
  test('should find the three numbers summing to given value', () => {
    const input = [1721, 979, 366, 299, 675, 1456];
    const expected = [979, 366, 675];
    expect(findThreeNumbersSummingTo(input, 2020)).toEqual(expected);
  });
});
