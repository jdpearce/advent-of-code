import { countFlips, TileState } from '../part-1/lib';

const neighbours = [
  [1, 0, -1],
  [0, 1, -1],
  [0, -1, 1],
  [-1, 0, 1],
  [1, -1, 0],
  [-1, 1, 0],
];

export type HexCoord = [number, number, number];

/**
 * We can go through the list of black tiles and check the neighbours for each one,
 * checking the rules for black tiles as we go.
 *
 * As we find neighbours that are white tiles, we can increment a counter for each
 * white tile found and then use that to determine the next state for each white tile.
 *
 * White tiles which aren't next to a black tile should never be affected.
 *
 * @param current The current state of the floor (the locations of the black tiles)
 */
export function getNextFloor(current: Map<string, HexCoord>): Map<string, HexCoord> {
  const whites = new Map<string, TileState>();

  const next = new Map<string, HexCoord>();

  // check the currently black tiles
  for (const [x, y, z] of current.values()) {
    let adjacent = 0;
    for (const [dx, dy, dz] of neighbours) {
      const coord: HexCoord = [x + dx, y + dy, z + dz];
      const key = coord.toString();
      if (current.has(key)) {
        adjacent++;
      } else {
        if (!whites.has(key)) {
          whites.set(key, { coord, count: 0 });
        }
        const state = whites.get(key);
        whites.set(key, { coord, count: state.count + 1 });
      }
    }

    const key = [x, y, z].toString();
    if (adjacent === 1 || adjacent === 2) {
      next.set(key, [x, y, z]);
    }
  }

  // check the white tile list we built up
  for (const state of whites.values()) {
    if (state.count === 2) {
      next.set(state.coord.toString(), state.coord);
    }
  }

  return next;
}

export function getInitialState(input: string): Map<string, HexCoord> {
  const state = new Map<string, HexCoord>();
  const flips = countFlips(input);
  for (const flip of flips.values()) {
    if (flip.count % 2 === 1) {
      state.set(flip.coord.toString(), flip.coord);
    }
  }
  return state;
}

export function getStateAfterDays(
  state: Map<string, HexCoord>,
  days: number
): Map<string, HexCoord> {
  for (let i = 0; i < days; i++) {
    state = getNextFloor(state);
  }
  return state;
}
