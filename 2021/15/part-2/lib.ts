/**
 * Grid is now five times larger than input
 * @param input
 * @returns
 */
export function parseIntoBigGrid(input: string): number[][] {
  const initial = input
    .split('\n')
    .filter((l) => !!l)
    .map((line) => line.split('').map(Number));

  const grid: number[][] = [];
  for (let repeatY = 0; repeatY < 5; repeatY++) {
    for (let repeatX = 0; repeatX < 5; repeatX++) {
      for (let y = 0; y < initial.length; y++) {
        for (let x = 0; x < initial[y].length; x++) {
          const [x0, y0] = [x + repeatX * initial.length, y + repeatY * initial.length];

          if (!grid[y0]) {
            grid[y0] = [];
          }

          const value = initial[y][x] + repeatY + repeatX;
          grid[y0][x0] = value > 9 ? (value % 10) + 1 : value;
        }
      }
    }
  }

  return grid;
}

export function prettyPrintGrid(grid: number[][]): string {
  return grid.map((line) => line.join('')).join('\n');
}
