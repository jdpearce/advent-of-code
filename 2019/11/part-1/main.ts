import * as fs from 'fs';
import * as path from 'path';
import { ProgramState, runUntilOutputOrHalt } from '../../09/part-1/lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const program = input
  .split('\n')[0]
  .split(',')
  .map(Number);

enum Color {
  Black = 0,
  White = 1
}

enum Direction {
  Up = 0,
  Left = 270,
  Down = 180,
  Right = 90
}

enum Turn {
  Left = 0,
  Right = 1
}

const painted: { [coord: string]: Color } = { '0|0': 0 };
const state = new ProgramState([...program]);

let current = { x: 0, y: 0 };
let direction = Direction.Up;
while (state.hasNotHalted) {
  const coord = `${current.x}|${current.y}`;
  const currentColour = painted[coord] || 0;
  state.input = [currentColour];
  state.output = [];
  runUntilOutputOrHalt(state);
  runUntilOutputOrHalt(state);
  if (state.output.length === 2) {
    const [paintColour, turn] = state.output;

    painted[coord] = paintColour;

    switch (turn) {
      case Turn.Left:
        direction = (direction + 270) % 360;
        break;
      case Turn.Right:
        direction = (direction + 90) % 360;
        break;
    }

    // move forward one space
    switch (direction) {
      case Direction.Up:
        current.y += 1;
        break;
      case Direction.Left:
        current.x -= 1;
        break;
      case Direction.Down:
        current.y -= 1;
        break;
      case Direction.Right:
        current.x += 1;
        break;
    }
  }
}

console.log(
  `The robot paints ${Object.keys(painted).length} panels at least once.`
);
