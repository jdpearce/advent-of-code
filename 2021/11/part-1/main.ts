import * as fs from 'fs';
import * as path from 'path';
import { gridFromInput, nextGridState } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const grid = gridFromInput(input);
let flashes = 0;
for (let i = 0; i < 100; i++) {
  flashes += nextGridState(grid);
}

console.log(`Number of flashes in 100 steps is ${flashes}`);
