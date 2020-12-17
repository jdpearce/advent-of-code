import * as fs from 'fs';
import * as path from 'path';
import { getNextCycle, parseInput } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

let space = parseInput(input);

for (let c = 0; c < 6; c++) {
  space = getNextCycle(space);
}

console.log(`Number of cubes after six cycles is ${space.cubeMap.size}`);
