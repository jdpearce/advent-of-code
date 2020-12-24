import { countFlips, directionsToVectors, parseDirections, vectorsToCoord } from './lib';

describe('2020-12-24.1', () => {
  const input = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`;

  it('should parse the input correctly', () => {
    const directions = parseDirections('esenee');
    expect(directions).toEqual(['e', 'se', 'ne', 'e']);
  });

  it('should parse directions to vectors', () => {
    const vectors = directionsToVectors(['e', 'se', 'ne', 'e']);
    expect(vectors).toEqual([
      [1, -1, 0],
      [0, -1, 1],
      [1, 0, -1],
      [1, -1, 0],
    ]);
  });

  it('should get the tile coordinates', () => {
    const directions = parseDirections('nwwswee');
    const vectors = directionsToVectors(directions);
    const coord = vectorsToCoord(vectors);
    expect(coord).toEqual([0, 0, 0]);
  });

  it('should count the number of flips', () => {
    const flips = countFlips(input);

    const counts = [...flips.values()];

    const even = counts.filter((x) => x.count % 2 === 0).length;
    const odd = counts.length - even;

    expect(even).toBe(5);
    expect(odd).toBe(10);
  });
});
