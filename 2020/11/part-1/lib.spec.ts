import { arePlansEqual, calcNextRound, calcOccupiedSeatsWhenStable } from './lib';

describe('2020-12-11.1', () => {
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

  const round2 = `#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##`;

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

    expect(calcNextRound(round1_array)).toEqual(round2_array);
  });

  it('should calculate the number of occupied seats', () => {
    expect(calcOccupiedSeatsWhenStable(input, calcNextRound)).toEqual(37);
  });

  it('should compare seating plans', () => {
    const round0_array = input
      .split('\n')
      .filter((x) => x)
      .map((r) => r.split(''));

    expect(arePlansEqual(round0_array, round0_array)).toBe(true);
  });
});
