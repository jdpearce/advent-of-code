import { playGame } from './lib';

describe('2021-12-21.1', () => {
  const input = [4, 8];

  it('should play the game', () => {
    const result = playGame(input);
    expect(result[0] * result[1]).toBe(739785);
  });
});
