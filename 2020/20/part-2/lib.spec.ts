import { parseTiles } from '../part-1/lib';
import {
  buildImage,
  calculateRoughness,
  flipContent,
  flipTile,
  getCorrectOrientation,
  rotateContent,
  rotateTile,
} from './lib';

describe('2020-12-20.2', () => {
  const input = `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`;

  const output = `.#.#..#.##...#.##..#####
###....#.#....#..#......
##.##.###.#.#..######...
###.#####...#.#####.#..#
##.#....#.##.####...#.##
...########.#....#####.#
....#..#...##..#.#.###..
.####...#..#.....#......
#..#.##..#..###.#.##....
#.####..#.####.#.#.###..
###.#.#...#.######.#..##
#.####....##..########.#
##..##.#...#...#.#.#.#..
...#..#..#.#.##..###.###
.#.#....#.##.#...###.##.
###.#...#..#.##.######..
.#.#.###.##.##.#..#.##..
.####.###.#...###.#..#.#
..#.#..#..#.#.#.####.###
#..####...#.#.#.###.###.
#####..#####...###....##
#.##..#..#...#..####...#
.#.###..##..##..####.##.
...###...##...#...#..###`;

  it('should return content of tile', () => {
    const tiles = parseTiles(input);
    expect(tiles[0].content).toEqual([
      '#..#....',
      '...##..#',
      '###.#...',
      '#.##.###',
      '#...#.##',
      '#.#.#..#',
      '.#....#.',
      '##...#.#',
    ]);
  });

  it('should rotate content', () => {
    const content = ['#..', '.#.', '..#'];

    let newContent = rotateContent(content);
    expect(newContent).toEqual(['..#', '.#.', '#..']);

    newContent = rotateContent(newContent);
    expect(newContent).toEqual(content);
  });

  it('should flip the content', () => {
    const content = ['#...', '..#.', '...#'];

    let newContent = flipContent(content);
    expect(newContent).toEqual(['...#', '.#..', '#...']);
  });

  it('should flip an entire tile', () => {
    const tiles = parseTiles(input);

    const tile = tiles[8];

    expect(tile).toEqual({
      id: 3079,
      content: [
        '#..#####',
        '.#......',
        '#####...',
        '###.#..#',
        '#...#.##',
        '.#####.#',
        '.#.###..',
        '.#......',
      ],
      edges: ['#.#.#####.', '.#....#...', '...###.#..', '...#.##..#'],
    });

    const rotated = flipTile(tile);
    expect(rotated).toEqual({
      id: 3079,
      content: [
        '#####..#',
        '......#.',
        '...#####',
        '#..#.###',
        '##.#...#',
        '#.#####.',
        '..###.#.',
        '......#.',
      ],
      edges: ['.#####.#.#', '#..##.#...', '..#.###...', '...#....#.'],
    });
  });

  it('should rotate an entire tile', () => {
    const tiles = parseTiles(input);

    const tile = tiles[8];

    expect(tile).toEqual({
      id: 3079,
      content: [
        '#..#####',
        '.#......',
        '#####...',
        '###.#..#',
        '#...#.##',
        '.#####.#',
        '.#.###..',
        '.#......',
      ],
      edges: ['#.#.#####.', '.#....#...', '...###.#..', '...#.##..#'],
    });

    const rotated = rotateTile(tile);
    expect(rotated).toEqual({
      id: 3079,
      content: [
        '...###.#',
        '###.###.',
        '..#.##..',
        '.##..#.#',
        '.#####.#',
        '.##....#',
        '...#...#',
        '..###..#',
      ],
      edges: ['...#.##..#', '#.#.#####.', '.#....#...', '...###.#..'],
    });
  });

  it('should build the image', () => {
    const image = buildImage(input);

    const flipped = flipContent(image.split('\n'));
    const rotated = rotateContent(rotateContent(flipped));

    expect(rotated.join('\n')).toBe(output);
  });

  it('should get correct orientation with monsters', () => {
    const result = getCorrectOrientation(output.split('\n'));
    expect(result.monsters.length).toBe(2);
    expect(result.monsters).toEqual([
      [2, 2],
      [1, 16],
    ]);
  });

  it('should calculate the roughness', () => {
    const { image, monsters } = getCorrectOrientation(output.split('\n'));
    const result = calculateRoughness(image, monsters);
    expect(result).toBe(273);
  });
});
