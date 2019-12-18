import * as fs from 'fs';
import * as path from 'path';
import { calculateAlignmentParams, generateGrid } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const program = input
  .split('\n')[0]
  .split(',')
  .map(Number);

const grid = generateGrid(program);
const params = calculateAlignmentParams(grid);

console.log(
  `Sum of alignment parameters is ${params.reduce(
    (acc, curr) => (acc += curr),
    0
  )}`
);
