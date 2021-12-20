import {
  countLitPixels,
  enhance,
  getBiggerGrid,
  getEnhancedPixel,
  parseGridAndAlgorithm,
  prettyPrintGrid,
} from './lib';

describe('2021-12-20.1', () => {
  const input = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###
`;
  it('should get enhanced pixels', () => {
    const [grid, algo] = parseGridAndAlgorithm(input);
    const output = getBiggerGrid(grid, '.');
    expect(getEnhancedPixel(output, algo, [3, 3], '.')).toBe('#');

    expect(getEnhancedPixel(output, algo, [0, 1], '.')).toBe('#');
  });

  it('should make a small grid bigger', () => {
    let grid = [['#']];
    grid = getBiggerGrid(grid, '.');
    expect(grid).toEqual([
      ['.', '.', '.'],
      ['.', '#', '.'],
      ['.', '.', '.'],
    ]);
  });

  it('should enhance the grid', () => {
    const [grid, algo] = parseGridAndAlgorithm(input);
    const grid1 = enhance(grid, algo, 0);
    const expected = `.##.##.
#..#.#.
##.#..#
####..#
.#..##.
..##..#
...#.#.`;
    const grid1String = prettyPrintGrid(grid1);
    expect(grid1String).toEqual(expected);
  });

  it.only('should count the lit pixels', () => {
    const [grid, algo] = parseGridAndAlgorithm(input);
    const grid1 = enhance(grid, algo, 1);
    const grid2 = enhance(grid1, algo, 2);
    expect(countLitPixels(grid2)).toBe(35);
  });
});
