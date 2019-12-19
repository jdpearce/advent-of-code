import { PathCalculator } from './lib';

describe('17, part-2', () => {
  const input = `..#..........
  ..#..........
  #######...###
  #.#...#...#.#
  #############
  ..#...#...#..
  ..#####...^..`;

  test('can calculate starting point', () => {
    const grid = input.split('\n').map(x => x.trim().split(''));

    const calculator = new PathCalculator(grid);
    expect(calculator.getCurrent()).toEqual([10, 6]);
  });
});
