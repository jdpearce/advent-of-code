import { calculateLifeSupportRating } from './lib';

describe('2021-12-03.2', () => {
  const input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

  it('should calculate the life support rating', () => {
    expect(calculateLifeSupportRating(input)).toBe(230);
  });
});
