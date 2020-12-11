import { calcOccupiedSeatsWhenStable } from '../part-1/lib';
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
    const round0_array = input
      .split('\n')
      .filter((x) => x)
      .map((r) => r.split(''));
    const round1_array = round1
      .split('\n')
      .filter((x) => x)
      .map((r) => r.split(''));
    const round2_array = round2
      .split('\n')
      .filter((x) => x)
      .map((r) => r.split(''));

    expect(calcNextRound(round0_array)).toEqual(round1_array);

    const actual = calcNextRound(round1_array);
    // console.log(actual.map((r) => r.join('')).join('\n'));
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

    let seats = test
      .split('\n')
      .filter((x) => x)
      .map((r) => r.split(''));

    const directions = [
      [+1, 0],
      [+1, +1],
      [0, +1],
      [-1, +1],
      [-1, 0],
      [-1, -1],
      [0, -1],
      [+1, -1],
    ];

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

    seats = test2
      .split('\n')
      .filter((x) => x)
      .map((r) => r.split(''));

    directions.forEach(([dx, dy]) => {
      expect(isDirectionOccupied(seats, [3, 3], [dx, dy])).toBe(false);
    });

    const test3 = `.............
.L.L.#.#.#.#.
.............`;

    seats = test3
      .split('\n')
      .filter((x) => x)
      .map((r) => r.split(''));

    directions.forEach(([dx, dy]) => {
      expect(isDirectionOccupied(seats, [1, 1], [dx, dy])).toBe(false);
    });
  });
});
