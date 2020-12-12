export type Facing = 'N' | 'S' | 'E' | 'W';

export interface Point {
  x: number;
  y: number;
}

export interface Position {
  ship: Point;
  waypoint: Point;
}

/**
 * Use the standard rotation matrices
 *
 * 90 => [0 -1]
 *       [1  0]
 *
 * 180 => [-1  0]
 *        [ 0 -1]
 *
 * 270 => [ 0 1]
 *        [-1 0]
 *
 * @param point
 * @param angle
 */
export function rotate(point: Point, angle: number): Point {
  switch (angle) {
    case 90:
      return {
        x: -point.y,
        y: point.x,
      };
    case 180:
      return {
        x: -point.x,
        y: -point.y,
      };
    case 270:
      return {
        x: point.y,
        y: -point.x,
      };
  }

  return point;
}

export const actions = {
  N: (value, current: Position): Position => ({
    ...current,
    waypoint: {
      x: current.waypoint.x,
      y: current.waypoint.y + value,
    },
  }),
  S: (value, current: Position): Position => ({
    ...current,
    waypoint: {
      x: current.waypoint.x,
      y: current.waypoint.y - value,
    },
  }),
  E: (value, current: Position): Position => ({
    ...current,
    waypoint: {
      x: current.waypoint.x + value,
      y: current.waypoint.y,
    },
  }),
  W: (value, current: Position): Position => ({
    ...current,
    waypoint: {
      x: current.waypoint.x - value,
      y: current.waypoint.y,
    },
  }),
  L: (value, current: Position): Position => ({
    ...current,
    waypoint: rotate(current.waypoint, value),
  }),
  R: (value, current: Position): Position => ({
    ...current,
    waypoint: rotate(current.waypoint, 360 - value),
  }),
  F: (value, current: Position): Position => ({
    ...current,
    ship: {
      x: current.ship.x + current.waypoint.x * value,
      y: current.ship.y + current.waypoint.y * value,
    },
  }),
};

export function processInstruction(instruction: string, current: Position): Position {
  const action = instruction.substr(0, 1);
  const value = Number(instruction.substr(1));
  return actions[action](value, current);
}

export function calculateManhattanDistance(position: Position): number {
  return Math.abs(position.ship.x) + Math.abs(position.ship.y);
}
