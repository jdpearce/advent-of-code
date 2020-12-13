import { getIdsAndOffsets } from './lib';

describe('2020-12-13.2', () => {
  const input = `939
7,13,x,x,59,x,31,19`;

  it('should get ids and offsets', () => {
    expect(getIdsAndOffsets(input)).toEqual({
      7: 0,
      13: 1,
      59: 4,
      31: 6,
      19: 7,
    });
  });
});
