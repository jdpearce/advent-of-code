import * as fs from 'fs';
import * as path from 'path';
import { generate, tryPermutation } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const program = input
  .split('\n')[0]
  .split(',')
  .map(Number);

let permutations = [];
generate(5, [5, 6, 7, 8, 9], permutations);

let maxSignal = 0;
for (const settings of permutations) {
  const lastOutput = tryPermutation(program, settings);
  if (lastOutput > maxSignal) {
    maxSignal = lastOutput;
  }
}

console.log(`The maximum output is ${maxSignal}`);
