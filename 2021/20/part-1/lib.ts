const surrounding: [number, number][] = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [0, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

export function parseGridAndAlgorithm(input: string): [string[][], string[]] {
  const [algo, gridlines] = input.split('\n\n');
  return [
    gridlines
      .split('\n')
      .filter((l) => !!l)
      .map((line) => line.split('')),
    algo.split(''),
  ];
}

/**
 * Each time we need to make the grid bigger since the
 * pixels on the edge will need to be enhanced too
 * @param grid
 */
export function enhance(grid: string[][], algorithm: string[], iteration: number): string[][] {
  // TODO - hardcoded for now. Fuck it.
  // Flashing world grid. This is just EVIL.
  let outer = '.';
  if (algorithm[0] === '#') {
    outer = iteration % 2 ? '.' : '#';
  }
  const input = getBiggerGrid(grid, outer);
  const output = getBiggerGrid(grid, outer);

  for (let y = 0; y < output.length; y++) {
    for (let x = 0; x < output[y].length; x++) {
      output[y][x] = getEnhancedPixel(input, algorithm, [x, y], outer);
    }
  }

  return output;
}

export function getEnhancedPixel(
  input: string[][],
  algorithm: string[],
  [x, y]: [number, number],
  outer: string
): string {
  const binaryString: string[] = [];
  for (const [dx, dy] of surrounding) {
    const [x1, y1] = [x + dx, y + dy];
    if (x1 < 0 || y1 < 0 || y1 >= input.length || x1 >= input[y].length) {
      binaryString.push(outer === '#' ? '1' : '0');
    } else if (input[y1][x1] === '#') {
      binaryString.push('1');
    } else {
      binaryString.push('0');
    }
  }
  const index = parseInt(binaryString.join(''), 2);
  return algorithm[index];
}

export function getBiggerGrid(grid: string[][], outer: string): string[][] {
  let output: string[][] = [];
  output.push([...getMany(outer, grid.length + 2)]);
  for (let i = 0; i < grid.length; i++) {
    output.push([outer, ...grid[i], outer]);
  }
  output.push([...getMany(outer, grid.length + 2)]);
  return output;
}

export function* getMany(char: string, n: number): Generator<string> {
  for (let i = 0; i < n; i++) {
    yield char;
  }
}

export function prettyPrintGrid(grid: string[][]): string {
  return grid.map((line) => line.join('')).join('\n');
}

export function countLitPixels(grid: string[][]): number {
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === '#') {
        count++;
      }
    }
  }
  return count;
}
