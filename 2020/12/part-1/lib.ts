export type Facing = 'N' | 'S' | 'E' | 'W';

export interface Position {
  x: number;
  y: number;
  facing: Facing;
}

const leftTurns = {
  N: { 90: 'W', 180: 'S', 270: 'E' },
  S: { 90: 'E', 180: 'N', 270: 'W' },
  E: { 90: 'N', 180: 'W', 270: 'S' },
  W: { 90: 'S', 180: 'E', 270: 'N' },
};

export function calcFacing(facing: Facing, value: number): Facing {
  return leftTurns[facing][value];
}

export const actions = {
  N: (value, current: Position): Position => ({
    ...current,
    y: current.y + value,
  }),
  S: (value, current: Position): Position => ({
    ...current,
    y: current.y - value,
  }),
  E: (value, current: Position): Position => ({
    ...current,
    x: current.x + value,
  }),
  W: (value, current: Position): Position => ({
    ...current,
    x: current.x - value,
  }),
  L: (value, current: Position): Position => ({
    ...current,
    facing: calcFacing(current.facing, value),
  }),
  R: (value, current: Position): Position => ({
    ...current,
    facing: calcFacing(current.facing, 360 - value),
  }),
  F: (value, current: Position): Position => actions[current.facing](value, current),
};

export function processInstruction(instruction: string, current: Position): Position {
  const action = instruction.substr(0, 1);
  const value = Number(instruction.substr(1));
  return actions[action](value, current);
}

export function calculateManhattanDistance(position: Position): number {
  return Math.abs(position.x) + Math.abs(position.y);
}
