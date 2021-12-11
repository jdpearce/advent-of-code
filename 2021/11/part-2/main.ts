import * as fs from 'fs';
import * as path from 'path';
import { gridFromInput, nextGridState } from '../part-1/lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const grid = gridFromInput(input);
let flashes = 0;
let step = 0;
while (flashes !== 100) {
  step++;
  flashes = nextGridState(grid);
}

console.log(`First time they sync up is on step ${step}`);
