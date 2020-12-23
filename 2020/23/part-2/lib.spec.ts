import { parseInput, playGame } from './lib';

describe('2020-12-23.2', () => {
  const input = `389125467`;

  it('should be able to parse the input', () => {
    const game = parseInput(input, 1e6);
    expect(Object.keys(game.next).length).toBe(1e6);
  });

  it('should be able to play a really big game', () => {
    const game = parseInput(input, 1e6);
    const result = playGame(game, 1e7);
    expect(result).toEqual([934001, 159792]);
  });
});
