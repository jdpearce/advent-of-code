const directions = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];
type Point = [number, number];

export function nextGridState(grid: number[][]): number {
  const toFlash: Point[] = [];

  // step 1 -> increase energy levels
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      grid[y][x]++;
      if (grid[y][x] > 9) {
        toFlash.push([x, y]);
      }
    }
  }

  // step 2 -> do the flashing
  const flashed = new Set<string>();
  const flashedPoints: Point[] = [];

  while (toFlash.length) {
    const [x, y] = toFlash.shift();
    if (flashed.has(`${x}:${y}`)) {
      continue;
    }

    for (const [dx, dy] of directions) {
      const [x1, y1] = [x + dx, y + dy];
      if (
        x1 < 0 ||
        y1 < 0 ||
        x1 === grid[y].length ||
        y1 === grid.length ||
        flashed.has(`${x1}:${y1}`)
      ) {
        // already flashed this turn
        // or we're at an edge
        continue;
      }

      grid[y1][x1]++;
      if (grid[y1][x1] > 9) {
        toFlash.push([x1, y1]);
      }
    }

    flashed.add(`${x}:${y}`);
    flashedPoints.push([x, y]);
  }

  // step 3 -> set all the flashed octopuses to zero
  for (const [x, y] of flashedPoints) {
    grid[y][x] = 0;
  }

  return flashedPoints.length;
}

export function gridFromInput(input: string): number[][] {
  return input
    .split('\n')
    .filter((l) => !!l)
    .map((l) => l.split('').map(Number));
}

export function gridToString(grid: number[][]): string {
  return grid.map((line) => line.join('')).join('\n');
}
