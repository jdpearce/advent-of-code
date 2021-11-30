export function parseInputToMap(input: string): string[][] {
  return input
    .split('\n')
    .filter((x) => x)
    .map((x) => x.split(''));
}

export function getStart(map: string[][]): [number, number] {
  let x = 0;
  let y = 0;
  let found = false;
  for (; y < map.length && !found; y++) {
    const row = map[y];
    for (x = 0; x < row.length && !found; x++) {
      if (row[x] === '@') {
        found = true;
      }
    }
  }

  return [x - 1, y - 1];
}
