import { getNeighbours, getNextCycle, parseInput } from './lib';

describe('2020-12-17.2', () => {
  const input = `.#.
..#
###`;

  const input2 = `..#....#
##.#..##
.###....
#....#.#
#.######
##.#....
#.......
.#......`;

  it('should calculate 80 neighbours', () => {
    const neighbours = getNeighbours();
    expect(neighbours.length).toBe(80);
  });

  it('should calculate cubes after n cycles', () => {
    let space = parseInput(input2);
    console.log(space);

    space = getNextCycle(space);
    space = getNextCycle(space);
    space = getNextCycle(space);
    space = getNextCycle(space);
    space = getNextCycle(space);
    space = getNextCycle(space);

    expect(space.cubeMap.size).toBe(848);
  });
});
