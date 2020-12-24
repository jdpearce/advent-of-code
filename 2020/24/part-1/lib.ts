export function parseDirections(line: string): string[] {
  const directions: string[] = [];
  for (let i = 0; i < line.length; i++) {
    switch (line[i]) {
      case 'n':
      case 's':
        directions.push(line[i] + line[i + 1]);
        i++;
        break;

      default:
        directions.push(line[i]);
        break;
    }
  }
  return directions;
}

/**
 * cf. https://www.redblobgames.com/grids/hexagons/
 * Convert the directions to vectors in hex coord system [x, y, z], e.g.
 * e = [1, -1, 0],
 * w = [-1, 0, 0]
 * ne = [-1, 1, 0]
 * nw = [1, 0 -1]
 * ...
 * This should allow us to uniquely identify each tile with a coordinate.
 * @param directions
 */
export function directionsToVectors(directions: string[]): [number, number, number][] {
  const vectors: [number, number, number][] = [];
  for (const direction of directions) {
    switch (direction) {
      case 'ne':
        vectors.push([1, 0, -1]);
        break;

      case 'nw':
        vectors.push([0, 1, -1]);
        break;

      case 'se':
        vectors.push([0, -1, 1]);
        break;

      case 'sw':
        vectors.push([-1, 0, 1]);
        break;

      case 'e':
        vectors.push([1, -1, 0]);
        break;

      case 'w':
        vectors.push([-1, 1, 0]);
        break;
    }
  }
  return vectors;
}

export function vectorsToCoord(vectors: [number, number, number][]): [number, number, number] {
  let [x, y, z] = [0, 0, 0];

  for (const [x1, y1, z1] of vectors) {
    x += x1;
    y += y1;
    z += z1;
  }

  return [x, y, z];
}

export interface TileState {
  coord: [number, number, number];
  count: number;
}

export function countFlips(input: string): Map<string, TileState> {
  const flips = new Map<string, TileState>();

  const lines = input.split('\n').filter((x) => x);
  for (const line of lines) {
    const directions = parseDirections(line);
    const vectors = directionsToVectors(directions);
    const coord = vectorsToCoord(vectors);
    const key = coord.toString();
    if (!flips.has(key)) {
      flips.set(key, { coord, count: 0 });
    }
    const state = flips.get(key);
    flips.set(key, { ...state, count: state.count + 1 });
  }

  return flips;
}
