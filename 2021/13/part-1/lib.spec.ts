import { foldGrid, getPointsAndFolds } from './lib';

describe('2021-12-13.1', () => {
  const input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

  const firstFold = `#.##..#..#.
#...#......
......#...#
#...#......
.#.#..#.###
...........
...........`;

  it('should calculate first fold', () => {
    const [points, folds] = getPointsAndFolds(input);
    const folded = foldGrid(points, folds[0]);

    expect(folded.length).toBe(17);
  });
});
