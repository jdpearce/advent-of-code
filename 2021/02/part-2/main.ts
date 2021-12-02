import * as fs from 'fs';
import * as path from 'path';
import { calculateFinalPositionWithAim } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const finalPosition = calculateFinalPositionWithAim(input);

console.log(
  `Final position multiplied by depth is ${finalPosition.horizontal * finalPosition.depth}`
);
