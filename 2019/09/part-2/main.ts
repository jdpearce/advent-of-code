import * as fs from 'fs';
import * as path from 'path';
import { ProgramState, runIntCode } from '../part-1/lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const program = input
  .split('\n')[0]
  .split(',')
  .map(Number);

const state = new ProgramState([...program]);
state.input.push(2);
runIntCode(state);

console.log(`The distress signal coordinates are ${state.output}`);
