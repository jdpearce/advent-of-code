import { findTwoNumbersSummingTo } from './lib';

describe('2020-12-01.1', () => {
  test('should find the two numbers', () => {
    const input = [1721, 979, 366, 299, 675, 1456];
    const expected = [1721, 299];
    expect(findTwoNumbersSummingTo(input, 2020)).toEqual(expected);
  });
});
