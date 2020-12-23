import { calculateWinningScore, Game, parseGame, playGame, playRound } from './lib';

describe('2020-12-22.1', () => {
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

  it('should parse the game', () => {
    const game = parseGame(input);
    expect(game).toEqual({
      p1: [9, 2, 6, 3, 1],
      p2: [5, 8, 4, 7, 10],
      prior: new Set<string>(),
      rounds: 0,
      depth: 0,
    });
  });

  it('should play a round', () => {
    const game = parseGame(input);
    const next = playRound(game);
    expect(next).toEqual(
      expect.objectContaining({
        p1: [2, 6, 3, 1, 9, 5],
        p2: [8, 4, 7, 10],
        rounds: 1,
      })
    );
  });

  it('should calculate the winner', () => {
    const game = parseGame(input);
    const win = playGame(game);
    expect(win).toEqual(
      expect.objectContaining({
        p1: [],
        p2: [3, 2, 10, 6, 8, 5, 9, 4, 7, 1],
        rounds: 29,
        winner: 2,
      })
    );
  });

  it('should calculate winning score', () => {
    const game: Game = {
      p1: [],
      p2: [3, 2, 10, 6, 8, 5, 9, 4, 7, 1],
      depth: 0,
      prior: new Set(),
      rounds: 29,
    };

    expect(calculateWinningScore(game)).toBe(306);
  });
});
