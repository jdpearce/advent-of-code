import { calcOccupiedSeatsWhenStable, directions, toGrid } from '../part-1/lib';
import { calcNextRound, isDirectionOccupied } from './lib';

describe('2020-12-11.2', () => {
  const input = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

  const round1 = `#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##`;

  const round2 = `#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#`;

  it('should calculate the number of occupied seats', () => {
    expect(calcOccupiedSeatsWhenStable(input, calcNextRound)).toEqual(26);
  });

  it('should calculate each round correctly', () => {
    const round0_array = toGrid(input);
    const round1_array = toGrid(round1);
    const round2_array = toGrid(round2);
    expect(calcNextRound(round0_array)).toEqual(round1_array);
    expect(calcNextRound(round1_array)).toEqual(round2_array);
  });

  it('should calculate empty seats correctly', () => {
    const test = `.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`;

    let seats = toGrid(test);
    directions.forEach(([dx, dy]) => {
      expect(isDirectionOccupied(seats, [3, 4], [dx, dy])).toBe(true);
    });

    const test2 = `.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.`;

    seats = toGrid(test2);
    directions.forEach(([dx, dy]) => {
      expect(isDirectionOccupied(seats, [3, 3], [dx, dy])).toBe(false);
    });

    const test3 = `.............
.L.L.#.#.#.#.
.............`;

    seats = toGrid(test3);
    directions.forEach(([dx, dy]) => {
      expect(isDirectionOccupied(seats, [1, 1], [dx, dy])).toBe(false);
    });
  });
});
