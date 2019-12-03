export interface Point {
  x: number;
  y: number;
}

/**
 * Calculates the  manhattan distance to the origin
 * of the closest crossing between two paths
 *
 * @param paths An array of arrays of wire paths
 */
export function calcClosestCrossingDistance(paths: string[]): number {
  const grid: { [coord: string]: string } = {};

  let crossings: Point[] = [];
  for (let pathNum = 0; pathNum < paths.length; pathNum++) {
    const path = paths[pathNum];
    const vectors = path.split(',');
    const wire = `|${pathNum}`;

    let x = 0;
    let y = 0;
    for (const vector of vectors) {
      const direction = vector[0];
      const magnitude = Number(vector.substr(1));
      for (let i = 0; i < magnitude; i++) {
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
        if (grid[coord] && !grid[coord].includes(wire)) {
          crossings.push({ x, y });
          grid[coord] += wire;
        } else if (!grid[coord]) {
          grid[coord] = wire;
        }
      }
    }
  }

  const distances = crossings.map(p => Math.abs(p.x) + Math.abs(p.y));
  distances.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  return distances[0];
}
