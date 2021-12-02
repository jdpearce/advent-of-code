import * as fs from 'fs';
import * as path from 'path';
import { calculateFinalPosition } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const finalPosition = calculateFinalPosition(input);

console.log(
  `Final position multiplied by depth is ${finalPosition.horizontal * finalPosition.depth}`
);
