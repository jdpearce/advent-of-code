export function calculateMap(input: string): { [coord: string]: number } {
  const map: { [coord: string]: number } = {};

  const lines = input.split('\n').filter((l) => !!l);
  for (const line of lines) {
    let [[x1, y1], [x2, y2]] = line.split(' -> ').map((c) => c.split(',').map(Number));

    const dx = x2 > x1 ? 1 : -1;
    const dy = y2 > y1 ? 1 : -1;

    if (x1 === x2) {
      for (let y = y1; y != y2 + dy; y += dy) {
        map[`${x1}:${y}`] = (map[`${x1}:${y}`] || 0) + 1;
      }
    } else if (y1 === y2) {
      for (let x = x1; x != x2 + dx; x += dx) {
        map[`${x}:${y1}`] = (map[`${x}:${y1}`] || 0) + 1;
      }
    } else {
      // console.log(`ignored pair ${x1},${y1} -> ${x2},${y2}`);
    }
  }

  return map;
}

export function countDangerZones(map: { [coord: string]: number }): number {
  return Object.values(map).filter((p) => p > 1).length;
}
