import { calculateProblem } from './lib';

describe('2020-12-18.2', () => {
  [
    ['1 + 2 * 3 + 4 * 5 + 6', 231],
    ['1 + (2 * 3) + (4 * (5 + 6))', 51],
    ['2 * 3 + (4 * 5)', 46],
    ['5 + (8 * 3 + 9 + 3 * 4 * 3)', 1445],
    ['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', 669060],
    ['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', 23340],
  ].forEach(([problem, result]: [string, number]) => {
    it(`should calculate ${result} for ${problem}`, () => {
      expect(calculateProblem(problem)).toBe(result);
    });
  });
});
