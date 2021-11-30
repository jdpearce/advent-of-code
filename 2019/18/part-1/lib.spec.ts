import { getStart, parseInputToMap } from './lib';

describe('2019-12-18.1', () => {
  const input1 = `#########
#b.A.@.a#
#########`;

  const input2 = `########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################`;

  it('should find the start', () => {
    const map = parseInputToMap(input1);
    const start = getStart(map);
    expect(start).toEqual([5, 1]);
  });
});
