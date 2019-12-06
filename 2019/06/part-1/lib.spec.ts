import { countOrbits, populateOrbits } from './lib';

describe('orbit map', () => {
  const input = [
    'COM)B',
    'B)C',
    'C)D',
    'D)E',
    'E)F',
    'B)G',
    'G)H',
    'D)I',
    'E)J',
    'J)K',
    'K)L'
  ];

  test('populates the orbit map correctly', () => {
    const actual = populateOrbits(input);
    expect(actual).toEqual({
      ['B']: 'COM',
      ['C']: 'B',
      ['D']: 'C',
      ['E']: 'D',
      ['F']: 'E',
      ['G']: 'B',
      ['H']: 'G',
      ['I']: 'D',
      ['J']: 'E',
      ['K']: 'J',
      ['L']: 'K'
    });
  });

  test('can count the number of orbits', () => {
    const map = populateOrbits(input);
    const actual = countOrbits(map);
    expect(actual).toEqual(42);
  });
});
