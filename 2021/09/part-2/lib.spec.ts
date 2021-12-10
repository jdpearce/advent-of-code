import { findLargestBasinsProduct } from './lib';

describe('2021-12-09.2', () => {
  const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

  it('find the product of the 3 largest basins', () => {
    expect(findLargestBasinsProduct(input)).toBe(1134);
  });
});
