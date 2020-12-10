import { numberOfArrangements, numberOfArrangements2 } from './lib';

describe('2020-12-10.2', () => {
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

  describe('numberOfArrangements', () => {
    it('should calculate the number of arrangments', () => {
      let numbers = input
        .split('\n')
        .filter((x) => x)
        .map(Number);

      expect(numberOfArrangements(numbers)).toBe(8);

      numbers = large_input
        .split('\n')
        .filter((x) => x)
        .map(Number);

      expect(numberOfArrangements(numbers)).toBe(19208);
    });
  });

  describe('numberOfArrangements2', () => {
    it('should calculate the number of arrangments', () => {
      let numbers = input
        .split('\n')
        .filter((x) => x)
        .map(Number);

      expect(numberOfArrangements2(numbers)).toBe(8);

      numbers = large_input
        .split('\n')
        .filter((x) => x)
        .map(Number);

      expect(numberOfArrangements2(numbers)).toBe(19208);
    });
  });
});
