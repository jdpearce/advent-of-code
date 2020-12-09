import { findFirstInvalidNumber, getEncodingSet, isValid } from './lib';

describe('2020-12-09.1', () => {
  const input = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

  it('should calculate the encoding set', () => {
    const numbers = [1, 2, 3, 4];

    expect(getEncodingSet(numbers)).toEqual(new Set([3, 4, 5, 6, 7]));
  });

  it('should recognise invalid number', () => {
    expect(isValid(input.split('\n').map(Number), 14, 5)).toBe(false);
  });

  it('should find the first incorrect number', () => {
    expect(findFirstInvalidNumber(input, 5)).toBe(127);
  });
});
