import { parseInput, playGame } from './lib';

describe('2020-12-23.2', () => {
  const input = `389125467`;

  it('should be able to parse the input', () => {
    const game = parseInput(input);
    expect(game.cups.get(1e6).next).toBe(game.current);
    expect(game.cups.size).toBe(1e6);
  });

  //   +   53417,
  // +   615652,
  it('should be able to play a really big game', () => {
    const game = parseInput(input);
    const result = playGame(game, 1e7);
    expect(result).toEqual([934001, 159792]);
  });
});
