import { findShortestCostPath, parseIntoGrid } from './lib';

describe('2021-12-15.1', () => {
  const input = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`;

  it('should find the shortest cost path', () => {
    const grid = parseIntoGrid(input);
    const cost = findShortestCostPath(grid);
    expect(cost).toBe(40);
  });
});
