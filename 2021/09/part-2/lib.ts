export function findLargestBasinsProduct(input: string): number {
  const grid = getGrid(input);

  const lowestPoints = findLowestPoints(grid);

  let sizes: number[] = [];
  for (const point of lowestPoints) {
    sizes.push(findBasinSize(grid, point));
  }

  sizes.sort((a, b) => a - b);

  return sizes[sizes.length - 1] * sizes[sizes.length - 2] * sizes[sizes.length - 3];
}

export function findBasinSize(grid: number[][], [x, y]: Point): number {
  const q: Point[] = [];
  q.push([x, y]);

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const visited = new Set<string>();

  while (q.length > 0) {
    const [x0, y0] = q.shift();
    visited.add(`${x0}:${y0}`);

    for (const [dx, dy] of directions) {
      const [x1, y1] = [x0 + dx, y0 + dy];
      if (y1 < 0 || y1 === grid.length || x1 < 0 || x1 === grid[y1].length || grid[y1][x1] === 9) {
        // wall or edge
        continue;
      }

      if (visited.has(`${x1}:${y1}`)) {
        // been there
        continue;
      }

      q.push([x1, y1]);
    }
  }

  return visited.size;
}

type Point = [number, number];

export function findLowestPoints(grid: number[][]): Point[] {
  const points: Point[] = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const current = grid[y][x];
      const up = y === 0 ? 10 : grid[y - 1][x];
      const down = y === grid.length - 1 ? 10 : grid[y + 1][x];
      const left = x === 0 ? 10 : grid[y][x - 1];
      const right = x === grid[y].length - 1 ? 10 : grid[y][x + 1];

      if (up > current && down > current && left > current && right > current) {
        points.push([x, y]);
      }
    }
  }

  return points;
}

export function getGrid(input: string): number[][] {
  return input
    .split('\n')
    .filter((l) => !!l)
    .map((line) => line.split('').map(Number));
}
