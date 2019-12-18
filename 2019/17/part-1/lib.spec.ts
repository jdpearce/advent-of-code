import { calculateAlignmentParams } from './lib';

describe('alignment parameters', () => {
  const tests: [[string, number[]]] = [
    [
      `..#..........
  ..#..........
  #######...###
  #.#...#...#.#
  #############
  ..#...#...#..
  ..#####...^..`,
      [4, 8, 24, 40]
    ]
  ];

  tests.forEach(([input, expected]) => {
    test('should calculate alignment params', () => {
      const grid = input.split('\n').map(x => x.trim().split(''));
      expect(calculateAlignmentParams(grid)).toEqual(expected);
    });
  });
});
