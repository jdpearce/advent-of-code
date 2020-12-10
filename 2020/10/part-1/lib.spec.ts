import { calculateDistribution } from './lib';

describe('2020-12-10.1', () => {
  const input = `16
10
15
5
1
11
7
19
6
12
4`;

  const large_input = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

  it('shoould find device rating', () => {
    const numbers = input
      .split('\n')
      .filter((x) => x)
      .map(Number);
    numbers.sort((a, b) => a - b);
    const deviceRating = numbers[numbers.length - 1] + 3;
    expect(deviceRating).toBe(22);
  });

  it('should calculate distribution', () => {
    let numbers = input
      .split('\n')
      .filter((x) => x)
      .map(Number);

    expect(calculateDistribution(numbers)).toEqual({
      1: 7,
      3: 5,
    });

    numbers = large_input
      .split('\n')
      .filter((x) => x)
      .map(Number);

    expect(calculateDistribution(numbers)).toEqual({
      1: 22,
      3: 10,
    });
  });
});
