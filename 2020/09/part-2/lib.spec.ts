import { findContiguousRange } from './lib';

describe('2020-12-09.2', () => {
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

  it('should  do a thing', () => {
    expect(findContiguousRange(input.split('\n').map(Number), 127)).toEqual([15, 25, 47, 40]);
  });
});
