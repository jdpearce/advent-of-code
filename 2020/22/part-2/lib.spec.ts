import { parseGame } from '../part-1/lib';
import { playGame } from './lib';

describe('2020-12-22.2', () => {
  const input = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

  it('should play recursive combat...', () => {
    const game = parseGame(input);
    const win = playGame(game);
    expect(win).toEqual(
      expect.objectContaining({
        p1: [],
        p2: [7, 5, 6, 2, 4, 1, 10, 8, 9, 3],
        rounds: 17,
        winner: 2,
      })
    );
  });
});
