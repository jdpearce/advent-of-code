export function calculateMapWithDiagonals(input: string): { [coord: string]: number } {
  const map: { [coord: string]: number } = {};

  const lines = input.split('\n').filter((l) => !!l);
  for (const line of lines) {
    const [[x1, y1], [x2, y2]] = line.split(' -> ').map((c) => c.split(',').map(Number));

    const dx = x1 === x2 ? 0 : x2 > x1 ? 1 : -1;
    const dy = y1 === y2 ? 0 : y2 > y1 ? 1 : -1;

    for (let x = x1, y = y1; x != x2 + dx || y != y2 + dy; x += dx, y += dy) {
      map[`${x}:${y}`] = (map[`${x}:${y}`] || 0) + 1;
    }
  }

  return map;
}
