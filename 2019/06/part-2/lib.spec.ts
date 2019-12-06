import { countTransfers, populateOrbits } from './lib';

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
    'K)L',
    'K)YOU',
    'I)SAN'
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
      ['L']: 'K',
      ['SAN']: 'I',
      ['YOU']: 'K'
    });
  });

  test('can count the number of orbital transfers', () => {
    const map = populateOrbits(input);
    const actual = countTransfers(map);
    expect(actual).toEqual(4);
  });
});
