import { ProgramState } from '../../13/part-2/intcode-computer';

export function calculateAlignmentParams(grid: string[][]): number[] {
  const crossings: Array<[number, number]> = [];

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[y].length - 1; x++) {
      const pattern = [
        grid[y][x],
        grid[y - 1][x],
        grid[y + 1][x],
        grid[y][x - 1],
        grid[y][x + 1]
      ];
      if (pattern.join('') === '#####') {
        crossings.push([x, y]);
      }
    }
  }

  return crossings.map(([x, y]) => x * y);
}

export function generateGrid(program: number[]): string[][] {
  const state = new ProgramState(program);
  while (state.hasNotHalted) {
    state.tick();
  }
  return String.fromCharCode(...state.output)
    .split('\n')
    .map(x => x.split(''));
}
