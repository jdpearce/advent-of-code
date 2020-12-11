import * as fs from 'fs';
import * as path from 'path';
import { calcNextRound, calcOccupiedSeatsWhenStable } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(
  `The number of occupied seats when stable is ${calcOccupiedSeatsWhenStable(input, calcNextRound)}`
);
