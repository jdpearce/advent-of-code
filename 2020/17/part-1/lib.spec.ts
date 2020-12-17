import { countCubes, cubeToLayers, getNextCycle, isActive, parseInput } from './lib';

describe('2020-12-17.1', () => {
  const input = `.#.
..#
###`;

  it('should parse input to cubes', () => {
    const space = parseInput(input);
    expect(space).toEqual({
      max: [3, 3, 1],
      min: [-1, -1, -1],
      cubeMap: new Set<string>(['1,0,0', '2,1,0', '0,2,0', '1,2,0', '2,2,0']),
    });
  });

  it('should count cubes correctly', () => {
    const space = parseInput(input);

    expect(countCubes(space.cubeMap)).toBe(5);
  });

  it('should stringify the layers correctly', () => {
    const space = parseInput(input);

    const layers = cubeToLayers(space);

    const empty = `.....
.....
.....
.....
.....`;

    expect(layers.length).toBe(3);
    expect(layers[0]).toEqual(empty);
    expect(layers[1]).toEqual(`.....
..#..
...#.
.###.
.....`);
    expect(layers[2]).toEqual(empty);
  });

  it('should calculate active correctly', () => {
    const space = parseInput(input);

    expect(isActive([1, 0, 0], space.cubeMap)).toBe(true);
    expect(isActive([2, 1, 0], space.cubeMap)).toBe(true);
    expect(isActive([0, 2, 0], space.cubeMap)).toBe(true);
    expect(isActive([1, 2, 0], space.cubeMap)).toBe(true);
    expect(isActive([2, 2, 0], space.cubeMap)).toBe(true);
  });

  it('should calculate cubes after n cycles', () => {
    let space = parseInput(input);
    space = getNextCycle(space);

    expect(countCubes(space.cubeMap)).toEqual(11);

    let layers = cubeToLayers(space);
    expect(layers[1]).toEqual(`.....
.#...
...#.
..#..
.....`);

    space = getNextCycle(space);
    layers = cubeToLayers(space);
    expect(layers[2]).toEqual(`.......
...#...
..#..#.
.....#.
..#....
.......
.......`);

    // 3, 4, 5, 6
    space = getNextCycle(space);
    space = getNextCycle(space);
    space = getNextCycle(space);
    space = getNextCycle(space);

    expect(countCubes(space.cubeMap)).toBe(112);
  });
});
