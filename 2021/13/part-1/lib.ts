type Point = [number, number];

export function getPointsAndFolds(input: string): [Point[], [string, number][]] {
  const points: Point[] = [];
  const folds: [string, number][] = [];

  const [pointInput, foldInput] = input.split('\n\n');

  points.push(
    ...pointInput.split('\n').map((line) => line.split(',').map(Number) as [number, number])
  );
  folds.push(
    ...foldInput
      .split('\n')
      .filter((l) => !!l)
      .map((line) => line.split(' ')[2])
      .map((fold) => {
        const [axis, num] = fold.split('=');
        return [axis, Number(num)] as [string, number];
      })
  );

  return [points, folds];
}

// 0 1 2 3 4 5 6 7 8 9 0
// . # . . . | . . . # .
// 9 becomes 1, 9 - (9 - 5 * 2);

export function foldGrid(points: Point[], [axis, constant]: [string, number]): Point[] {
  const folded: Point[] = [];

  /**
   * A fold where y is constant means reflection along the x-axis
   * and a fold where x is constant means reflection on the y-axis
   *
   * i.e. for a point x, y reflected on x = 5 (x > 5)
   * x1, y1 becomes (x - 2*(x - 5), y);
   *
   */
  const pointSet = new Set<string>();
  for (const [x, y] of points) {
    if (axis === 'x' && x > constant) {
      pointSet.add(`${x - 2 * (x - constant)}:${y}`);
    } else if (axis === 'y' && y > constant) {
      pointSet.add(`${x}:${y - 2 * (y - constant)}`);
    } else {
      pointSet.add(`${x}:${y}`);
    }
  }

  for (const coord of pointSet.values()) {
    const [x, y] = coord.split(':').map(Number);
    folded.push([x, y]);
  }

  return folded;
}

export function prettyPrintPoints(points: Point[]): string {
  const grid: string[][] = [];
  let maxY = 0;
  let maxX = 0;
  for (const [x, y] of points) {
    if (!grid[y]) {
      grid[y] = [];
    }
    grid[y][x] = '#';
    maxY = y > maxY ? y : maxY;
    maxX = x > maxX ? x : maxX;
  }
  console.log(grid.length);
  for (let y = 0; y < maxY + 1; y++) {
    if (!grid[y]) {
      grid[y] = [];
    }
    for (let x = 0; x < maxX + 1; x++) {
      if (!grid[y][x]) {
        grid[y][x] = '.';
      }
    }
  }
  return grid.map((line) => line.join('')).join('\n');
}
