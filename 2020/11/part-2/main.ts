import * as fs from 'fs';
import * as path from 'path';
import { calcOccupiedSeatsWhenStable } from '../part-1/lib';
import { calcNextRound } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(
  `The number of occupied seats when stable is ${calcOccupiedSeatsWhenStable(input, calcNextRound)}`
);
