import { getInitialState, getNextFloor, getStateAfterDays } from './lib';

describe('2020-12-24.2', () => {
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

  it('should count the black tiles properly', () => {
    const state = getInitialState(input);
    expect(state.size).toBe(10);

    let next = getNextFloor(state);
    expect(next.size).toBe(15);

    next = getNextFloor(next);
    expect(next.size).toBe(12);
  });

  it('should get state after n days', () => {
    const state = getInitialState(input);
    let next = getStateAfterDays(state, 10);
    expect(next.size).toBe(37);

    next = getStateAfterDays(state, 100);
    expect(next.size).toBe(2208);
  });
});
