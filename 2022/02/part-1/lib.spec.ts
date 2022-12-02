import { calculateFinalScore } from './lib';

describe('2022-12-02.1', () => {
  const input = `A Y
B X
C Z`;

  it('should calculate your final score', () => {
    const score = calculateFinalScore(input);
    expect(score).toBe(15);
  });
});
