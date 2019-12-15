import { OpCode, ProgramState } from '../../13/part-2/intcode-computer';
import { Screen } from './screen';

export enum Direction {
  North = 1,
  South = 2,
  West = 3,
  East = 4
}

export enum MapPointType {
  Wall = 0,
  Empty = 1,
  OxygenSystem = 2,
  Origin = 3
}

export interface MapPoint {
  x: number;
  y: number;
  type?: MapPointType;
  parent?: MapPoint;
}

export type ShipMap = { [coord: string]: MapPoint };

export function addToMap(shipMap: ShipMap, point: MapPoint) {
  const coord = `${point.x}|${point.y}`;
  shipMap[coord] = point;
}

export function printMap(shipMap: ShipMap) {
  const screen = new Screen(shipMap);
  screen.outputScreen();
}

export function isInMap(shipMap: ShipMap, [x, y]: [number, number]): boolean {
  const coord = `${x}|${y}`;
  return !!shipMap[coord];
}

export function goInDirection(
  direction: Direction,
  [x, y]: [number, number]
): [number, number] {
  switch (direction) {
    case Direction.North:
      return [x, ++y];
    case Direction.South:
      return [x, --y];
    case Direction.East:
      return [++x, y];
    case Direction.West:
      return [--x, y];
  }
}

let shipMap: ShipMap = {};

/**
 * We can use a Breadth First Search to map the part of the ship
 * and find the shortest route.
 *
 * https://en.wikipedia.org/wiki/Breadth-first_search
 *
 */
export function createMap(program: number[]): [ShipMap, MapPoint] {
  /**
   * Consider a tree where each node is a list of directions
   * rather than a point, from that we can build up the real map.
   */

  const origin: MapPoint = { x: 0, y: 0, type: MapPointType.Origin };
  shipMap = {};

  const q = [];
  q.push([origin, []]);
  let oxygen: MapPoint;

  while (q.length > 0) {
    // create a new program so we don't have to bother
    // actually backtracking the droid.
    const state = new ProgramState([...program]);
    const [parent, directions]: [MapPoint, Direction[]] = q.shift();
    let type: MapPointType;
    let [x, y] = [0, 0];

    for (const direction of directions) {
      type = walk(state, direction);
      [x, y] = goInDirection(direction, [x, y]);
    }

    const current = { x, y, type, parent };
    addToMap(shipMap, current);

    if (type === MapPointType.Wall) {
      continue;
    }

    if (type === MapPointType.OxygenSystem) {
      oxygen = current;
    }

    for (const direction of [1, 2, 3, 4]) {
      const [x1, y1] = goInDirection(direction, [x, y]);
      if (!isInMap(shipMap, [x1, y1])) {
        q.push([current, [...directions, direction]]);
      }
    }
  }

  return [shipMap, oxygen];
}

export function walk(state: ProgramState, direction: Direction) {
  if (state.next.opCode !== OpCode.Input) {
    throw new Error(`Expected ${OpCode.Input}, found ${state.next.opCode}`);
  }
  state.input.push(direction);
  do {
    state.tick();
  } while (state.next.opCode !== OpCode.Input);
  return state.output.pop();
}
