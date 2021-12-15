const directions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

export type Point = [number, number];

export function parseIntoGrid(input: string): number[][] {
  return input
    .split('\n')
    .filter((l) => !!l)
    .map((line) => line.split('').map(Number));
}

export function getCoord(point: Point): string {
  const [x, y] = point;
  return `${x}:${y}`;
}

/**
 * Dijkstra's Algorithm
 *
 * I know there's a faster way, but this makes sense at the moment.
 * Maybe I'll revisit this when I have more time to learn.
 *
 * https://www.redblobgames.com/pathfinding/a-star/introduction.html
 * @param grid
 * @returns
 */
export function findShortestCostPath(grid: number[][]) {
  const start: Point = [0, 0];
  const [xE, yE] = [grid.length - 1, grid.length - 1];

  const frontier: { point: Point; priority: number }[] = [];
  frontier.push({ point: start, priority: 0 });
  const cameFrom: { [coord: string]: Point } = {};
  const costSoFar: { [coord: string]: number } = {};
  costSoFar[`${getCoord(start)}`] = 0;

  while (frontier.length) {
    const {
      point: [x, y],
    } = frontier.shift();

    if (x === xE && y === yE) {
      break;
    }

    for (const [dx, dy] of directions) {
      const [x0, y0] = [x + dx, y + dy];

      if (x0 < 0 || y0 < 0 || x0 === grid.length || y0 === grid.length) {
        // hit a wall
        continue;
      }

      const newCost = costSoFar[getCoord([x, y])] + grid[y0][x0];
      const next = getCoord([x0, y0]);
      if (!costSoFar[next] || newCost < costSoFar[next]) {
        costSoFar[next] = newCost;
        frontier.push({ point: [x0, y0], priority: newCost });
        cameFrom[next] = [x, y];
        frontier.sort((a, b) => a.priority - b.priority);
      }
    }
  }

  return costSoFar[getCoord([xE, yE])];
}
