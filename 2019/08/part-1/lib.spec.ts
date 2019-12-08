import { parseLayers } from './lib';

describe('2019, day 8, part 1', () => {
  test('parsing layers', () => {
    const pixels = '123456789012'.split('').map(Number);

    const actual = parseLayers(pixels, 3, 2);

    expect(actual).toEqual([
      { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 },
      { 7: 1, 8: 1, 9: 1, 0: 1, 1: 1, 2: 1 }
    ]);
  });
});
