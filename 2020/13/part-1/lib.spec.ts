import { getDepartureTimeAndId } from './lib';

describe('2020-12-13.1', () => {
  const input = `939
7,13,x,x,59,x,31,19`;

  it('should calculate the earliest time to depart', () => {
    const result = getDepartureTimeAndId(input);
    expect(result).toEqual({ time: 5, id: 59 });
    expect(result.id * result.time).toBe(295);
  });
});
