import { calculateFinalPosition } from './lib';

describe('2021-12-02.1', () => {
  const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

  it('should calculate final position', () => {
    expect(calculateFinalPosition(input)).toEqual({ horizontal: 15, depth: 10 });
  });
});
