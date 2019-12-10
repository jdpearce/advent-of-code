import { AsteroidField } from './lib';

describe('2019, day 10, part 1', () => {
  describe('asteroid field', () => {
    test('calculates asteroid positions correctly', () => {
      const input = ['.#.#.'.split(''), '#.#.#'.split('')];

      const actual = new AsteroidField(input);

      expect(actual.asteroids.length).toBe(5);
      expect(actual.asteroids[0]).toEqual(
        expect.objectContaining({
          location: { x: 1, y: 0 }
        })
      );
    });

    describe('calculates the best asteroid for a base', () => {
      const testCases = [
        {
          input: `##
          ##`,
          location: { x: 0, y: 0 },
          count: 3
        },
        {
          input: `......#.#.
        #..#.#....
        ..#######.
        .#.#.###..
        .#..#.....
        ..#....#.#
        #..#....#.
        .##.#..###
        ##...#..#.
        .#....####`,
          location: { x: 5, y: 8 },
          count: 33
        },
        {
          input: `#.#...#.#.
          .###....#.
          .#....#...
          ##.#.#.#.#
          ....#.#.#.
          .##..###.#
          ..#...##..
          ..##....##
          ......#...
          .####.###.`,
          location: { x: 1, y: 2 },
          count: 35
        },
        {
          input: `.#..#..###
          ####.###.#
          ....###.#.
          ..###.##.#
          ##.##.#.#.
          ....###..#
          ..#.#..#.#
          #..#.#.###
          .##...##.#
          .....#.#..`,
          location: { x: 6, y: 3 },
          count: 41
        },
        {
          input: `.#..##.###...#######
          ##.############..##.
          .#.######.########.#
          .###.#######.####.#.
          #####.##.#.##.###.##
          ..#####..#.#########
          ####################
          #.####....###.#.#.##
          ##.#################
          #####.##.###..####..
          ..######..##.#######
          ####.##.####...##..#
          .#####..#.######.###
          ##...#.##########...
          #.##########.#######
          .####.#.###.###.#.##
          ....##.##.###..#####
          .#.#.###########.###
          #.#.#.#####.####.###
          ###.##.####.##.#..##`,
          location: { x: 11, y: 13 },
          count: 210
        }
      ];

      testCases.forEach((testCase, index) => {
        test(`calculates the best asteroid for input number ${index}`, () => {
          const arrays = testCase.input
            .split('\n')
            .map(x => x.trim())
            .map(x => x.split(''));
          const field = new AsteroidField(arrays);
          const best = field.getBestAsteroid();
          expect(best.location).toEqual(testCase.location);
          expect(Object.keys(best.angles).length).toEqual(testCase.count);
        });
      });
    });
  });
});
