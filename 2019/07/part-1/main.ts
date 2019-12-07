import * as fs from 'fs';
import * as path from 'path';
import { ProgramState, runIntCode } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const program = input
  .split('\n')[0]
  .split(',')
  .map(Number);

let maxSignal = 0;
for (let p1 = 0; p1 < 5; p1++) {
  for (let p2 = 0; p2 < 5; p2++) {
    if (p2 === p1) continue;
    for (let p3 = 0; p3 < 5; p3++) {
      if (p3 === p2 || p3 === p1) continue;
      for (let p4 = 0; p4 < 5; p4++) {
        if (p4 == p3 || p4 === p2 || p4 === p1) continue;
        for (let p5 = 0; p5 < 5; p5++) {
          if (p5 === p4 || p5 === p3 || p5 === p2 || p5 === p1) continue;
          const settings = [p1, p2, p3, p4, p5];
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
      }
    }
  }
}

console.log(`The maximum output is ${maxSignal}`);
