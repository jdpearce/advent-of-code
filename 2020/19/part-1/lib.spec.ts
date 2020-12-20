import { checkString, parseRules } from './lib';

describe('2020-12-19.1', () => {
  const input = `0 : 4 1 5
2: 4 4 | 5 5
5: "b"
3: 4 5 | 5 4
4: "a"
1: 2 3 | 3 2

ababbb
bababa
abbbab
aaabbb
aaaabbb`;

  it('parse the rules correctly', () => {
    const [rulesInput, stringsInput] = input.split('\n\n');
    const map = parseRules(rulesInput);
    const expected = new Map<number, string | number[][]>([
      [0, [[4, 1, 5]]],
      [
        2,
        [
          [4, 4],
          [5, 5],
        ],
      ],
      [5, 'b'],
      [
        3,
        [
          [4, 5],
          [5, 4],
        ],
      ],
      [4, 'a'],
      [
        1,
        [
          [2, 3],
          [3, 2],
        ],
      ],
    ]);
    expect(map).toEqual(expected);
  });

  it('should test the input strings correctly', () => {
    const [rulesInput, stringsInput] = input.split('\n\n');
    const map = parseRules(rulesInput);

    expect(checkString(map, 'ababbb', [0])).toBeTruthy();
    expect(checkString(map, 'bababa', [0])).toBeFalsy();
    expect(checkString(map, 'aaaabbb', [0])).toBeFalsy();
  });
});
