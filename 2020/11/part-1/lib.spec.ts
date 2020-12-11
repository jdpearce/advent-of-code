import { arePlansEqual, calcNextRound, calcOccupiedSeatsWhenStable, toGrid } from './lib';

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
    const round0_array = toGrid(input);
    const round1_array = toGrid(round1);
    const round2_array = toGrid(round2);
    expect(calcNextRound(round0_array)).toEqual(round1_array);
    expect(calcNextRound(round1_array)).toEqual(round2_array);
  });

  it('should calculate the number of occupied seats', () => {
    expect(calcOccupiedSeatsWhenStable(input, calcNextRound)).toEqual(37);
  });

  it('should compare seating plans', () => {
    const round0_array = toGrid(input);
    const round1_array = toGrid(round1);
    expect(arePlansEqual(round0_array, round0_array)).toBe(true);
    expect(arePlansEqual(round0_array, round1_array)).toBe(false);
  });
});
