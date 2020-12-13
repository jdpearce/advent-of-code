export function getIdsAndOffsets(input: string): { [id: number]: number } {
  const idsAndOffsets: { [id: number]: number } = {};

  const [_, buses] = input.split('\n').filter((x) => x);
  return buses.split(',').reduce((acc, current, index) => {
    if (current !== 'x') {
      acc[Number(current)] = index;
    }
    return acc;
  }, {});
}
