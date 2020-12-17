import { calculateCubes, parseInput } from './lib';

describe('2020-12-17.1', () => {
  const input = `.#.
..#
###`;

  it('should parse input to cubes', () => {
    const space = parseInput(input);
    console.log(space.cubeMap);
    expect(space).toEqual({
      max: [3, 3, 1],
      cubeMap: [
        [
          [0, 1, 0],
          [0, 0, 1],
          [1, 1, 1],
        ],
      ],
    });
  });

  it('should calculate cubes after n cycles', () => {
    expect(calculateCubes(input, 6)).toBe(112);
  });
});
