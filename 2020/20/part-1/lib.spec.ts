import { parseTiles, populateMatches } from './lib';

describe('2020-12-20.1', () => {
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

  it('should parse the tiles correctly', () => {
    const tiles = parseTiles(input);
    expect(tiles.length).toBe(9);
    expect(tiles[8]).toEqual(
      expect.objectContaining({
        id: 3079,
        edges: ['#.#.#####.', '.#....#...', '...###.#..', '...#.##..#'],
      })
    );

    // tile 3079 should match an edge with tile 2473
    expect(tiles[8].edges.some((x) => tiles[6].edges.includes(x)));
  });

  it('should find the corners', () => {
    let tiles = parseTiles(input);
    tiles = populateMatches(tiles);

    // maybe the corners will only have two matches?
    const corners = tiles.filter((tile) => tile.matches.length === 2);
    expect(corners.length).toBe(4);

    expect(corners.reduce((acc, curr) => (acc *= curr.id), 1)).toBe(20899048083289);
  });
});
