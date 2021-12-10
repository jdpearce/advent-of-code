type Point = [number, number];

export function calculateRiskLevelSum(input: string): number {
  // const points: Point[] = [];
  let riskLevelSum = 0;

  const grid = input
    .split('\n')
    .filter((l) => !!l)
    .map((line) => line.split('').map(Number));

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const current = grid[y][x];
      const up = y === 0 ? 10 : grid[y - 1][x];
      const down = y === grid.length - 1 ? 10 : grid[y + 1][x];
      const left = x === 0 ? 10 : grid[y][x - 1];
      const right = x === grid[y].length - 1 ? 10 : grid[y][x + 1];

      if (up > current && down > current && left > current && right > current) {
        // points.push([x, y]);
        riskLevelSum += current + 1;
      }
    }
  }

  return riskLevelSum;
}
