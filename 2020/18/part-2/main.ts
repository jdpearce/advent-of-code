import * as fs from 'fs';
import * as path from 'path';
import { calculateProblem } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const answer = input
  .split('\n')
  .filter((x) => x)
  .map((p) => calculateProblem(p))
  .reduce((acc, curr) => (acc += curr));

console.log(`The sum of all the problem answers is ${answer}`);
