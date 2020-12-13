export function getOffsets(input: string): { [id: number]: number } {
  const idsAndOffsets: { [id: number]: number } = {};

  const [_, buses] = input.split('\n').filter((x) => x);
  return buses.split(',').reduce((acc, current, index) => {
    if (current !== 'x') {
      acc[Number(current)] = index;
    }
    return acc;
  }, {});
}

export function getStartTime(input: string): number {
  const offsets = getOffsets(input);

  const ids = Object.keys(offsets).map(Number);
  ids.sort((a, b) => a - b);

  /**
   * We want to find the first number, t, for which:
   *
   * t + offset % id === 0
   *
   * For all (id, offset) pairs.
   *
   * The first will simply be a multiple of id0
   * Find the second one by incrementing by id0 * id1
   * Find the third by incrementing by id0 * id1 * id2
   * ... etc until we run out of ids.
   *
   * This only works for these numbers because they are coprime.
   * (i.e. they have no common factors other than 1)
   *
   */

  let increment = ids[0];
  let current = 0;
  for (let i = 1; i < ids.length; i++) {
    const id = ids[i];
    while (true) {
      if ((current + offsets[id]) % id === 0) {
        break;
      }
      current += increment;
    }
    increment *= id;
  }

  return current;
}
