import { countTrajectoryTrees } from './lib';

describe('2020-12-03.2', () => {
  const input = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`.split('\n');

  [
    [1, 1, 2],
    [3, 1, 7],
    [5, 1, 3],
    [7, 1, 4],
    [1, 2, 2],
  ].forEach(([x, y, num]) => {
    it(`should count ${num} trees for slope ${x}, ${y}`, () => {
      expect(countTrajectoryTrees(input, [x, y])).toBe(num);
    });
  });
});
