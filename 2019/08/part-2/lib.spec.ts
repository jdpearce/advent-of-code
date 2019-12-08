import { layerToLines, mergeLayers, pixelsToLayers } from './lib';

describe('2019, day 8, part 2', () => {
  test('parsing layers', () => {
    const pixels = '0222112222120000'.split('').map(Number);

    const actual = pixelsToLayers(pixels, 2, 2);

    expect(actual).toEqual([
      [0, 2, 2, 2],
      [1, 1, 2, 2],
      [2, 2, 1, 2],
      [0, 0, 0, 0]
    ]);
  });

  test('merging layers', () => {
    const pixels = '0222112222120000'.split('').map(Number);

    const actual = mergeLayers(pixelsToLayers(pixels, 2, 2));

    expect(actual).toEqual([0, 1, 1, 0]);
  });

  test('layer to lines', () => {
    const layer = [0, 1, 1, 0];
    const actual = layerToLines(layer, 2);
    expect(actual).toEqual([
      [0, 1],
      [1, 0]
    ]);
  });
});
