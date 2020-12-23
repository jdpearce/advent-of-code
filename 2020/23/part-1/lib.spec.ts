import { parseInput, playGame } from './lib';

describe('2020-12-23.1', () => {
  const input = `389125467`;

  it('should get the output', () => {
    expect(playGame(parseInput(input), 1)).toBe('54673289');
    expect(playGame(parseInput(input), 2)).toBe('32546789');
    expect(playGame(parseInput(input), 3)).toBe('34672589');
    expect(playGame(parseInput(input), 4)).toBe('32584679');
    expect(playGame(parseInput(input), 10)).toBe('92658374');
    expect(playGame(parseInput(input), 100)).toBe('67384529');
  });
});
