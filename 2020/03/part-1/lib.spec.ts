import { countTrajectoryTrees } from './lib';

describe('2020-12-03.1', () => {
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

  it('should count the number of trees', () => {
    const actual = countTrajectoryTrees(input, [3, 1]);
    expect(actual).toBe(7);
  });
});
