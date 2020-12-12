import * as fs from 'fs';
import * as path from 'path';
import { calculateManhattanDistance, Position, processInstruction } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const instructions = input.split('\n').filter((x) => x);

let position: Position = { x: 0, y: 0, facing: { x: 1, y: 0 } };
for (const i of instructions) {
  position = processInstruction(i, position);
}

console.log(
  `Manhattan distance after processing instructions is ${calculateManhattanDistance(position)}`
);
