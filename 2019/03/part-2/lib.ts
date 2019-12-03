export interface Point {
  x: number;
  y: number;
}

export interface Crossing {
  point: Point;
  wires: {
    [wire: number]: number;
  };
}

/**
 * Calculates the shortest wire distance
 * of all crossings between two (or more) paths
 *
 * @param paths An array of arrays of wire paths
 */
export function calcShortestTimingDistance(paths: string[]): number {
  const grid: { [coord: string]: Crossing } = {};

  let crossings: Crossing[] = [];
  for (let pathNum = 0; pathNum < paths.length; pathNum++) {
    const path = paths[pathNum];
    const vectors = path.split(',');

    let x = 0;
    let y = 0;
    let steps = 0;
    for (const vector of vectors) {
      const direction = vector[0];
      const magnitude = Number(vector.substr(1));
      for (let i = 0; i < magnitude; i++) {
        steps++;
        switch (direction) {
          case 'L':
            x -= 1;
            break;
          case 'R':
            x += 1;
            break;
          case 'U':
            y += 1;
            break;
          case 'D':
            y -= 1;
            break;
        }
        const coord = `${x}|${y}`;
        if (grid[coord] && !grid[coord].wires[pathNum]) {
          crossings.push(grid[coord]);
          grid[coord].wires[pathNum] = steps;
        } else {
          grid[coord] = {
            point: { x, y },
            wires: {
              [pathNum]: steps
            }
          };
        }
      }
    }
  }

  const distances = crossings.map(c =>
    Object.keys(c.wires).reduce((acc, curr) => acc + c.wires[curr], 0)
  );
  distances.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  return distances[0];
}
