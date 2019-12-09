import * as fs from 'fs';
import * as path from 'path';
import { ProgramState, runIntCode } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const program = input
  .split('\n')[0]
  .split(',')
  .map(Number);

const state = new ProgramState([...program]);
state.input.push(1);
runIntCode(state);

console.log(`The BOOST keycode is ${state.output}`);
