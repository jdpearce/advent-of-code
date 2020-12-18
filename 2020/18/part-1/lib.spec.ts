import { calculateProblem } from './lib';

describe('2020-12-18.1', () => {
  [
    ['1 + 2 * 3 + 4 * 5 + 6', 71],
    ['1 + (2 * 3) + (4 * (5 + 6))', 51],
    ['2 * 3 + (4 * 5)', 26],
    ['5 + (8 * 3 + 9 + 3 * 4 * 3)', 437],
    ['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', 12240],
    ['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', 13632],
  ].forEach(([problem, result]: [string, number]) => {
    it(`should calculate ${result} for ${problem}`, () => {
      expect(calculateProblem(problem)).toBe(result);
    });
  });
});
