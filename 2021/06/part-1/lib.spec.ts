import { calculateState } from './lib';

describe('2021-12-06.1', () => {
  const input = `3,4,3,1,2`;

  it('calculate lantern fish state after n days', () => {
    expect(calculateState(input, 18)).toEqual(
      '6,0,6,4,5,6,0,1,1,2,6,0,1,1,1,2,2,3,3,4,6,7,8,8,8,8'.split(',').map(Number)
    );

    expect(calculateState(input, 80).length).toBe(5934);
  });
});
