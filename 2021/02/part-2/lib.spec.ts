import { calculateFinalPositionWithAim } from './lib';

describe('2021-12-02.2', () => {
  const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

  it('calculate final position using new aim instruction too', () => {
    expect(calculateFinalPositionWithAim(input)).toMatchObject({
      horizontal: 15,
      depth: 60,
    });
  });
});
