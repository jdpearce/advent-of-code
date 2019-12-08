import * as fs from 'fs';
import * as path from 'path';
import { generate, ProgramState, runIntCode } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const program = input
  .split('\n')[0]
  .split(',')
  .map(Number);

let maxSignal = 0;
let permutations = [];
generate(5, [0, 1, 2, 3, 4], permutations);

for (const settings of permutations) {
  let lastOutput = 0;
  for (let setting of settings) {
    const state: ProgramState = {
      program: [...program],
      input: [lastOutput, setting],
      output: [],
      pointer: 0,
      modes: []
    };
    runIntCode(state);
    lastOutput = state.output[0];
  }
  if (lastOutput > maxSignal) {
    maxSignal = lastOutput;
  }
}

console.log(`The maximum output is ${maxSignal}`);
