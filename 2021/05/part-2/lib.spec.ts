import { countDangerZones } from '../part-1/lib';
import { calculateMapWithDiagonals } from './lib';

describe('2021-12-05.2', () => {
  const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

  it('should calculate the number of points where at least two lines overlap', () => {
    const map = calculateMapWithDiagonals(input);
    expect(countDangerZones(map)).toBe(12);
  });
});
