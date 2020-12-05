import { getSeat, getSeatId } from './lib';

describe('2020-12-05.1', () => {
  it('should  do a thing', () => {
    expect(getSeatId(getSeat('FBFBBFFRLR'))).toBe(357);
    expect(getSeatId(getSeat('FFFBBBFRRR'))).toBe(119);
  });
});
