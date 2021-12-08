import * as fs from 'fs';
import * as path from 'path';
import { ProgramState, runIntCode } from '../../../2019/09/part-1/lib';
import { calculateBestUseOfFuel } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Best use of fuel is ${calculateBestUseOfFuel(input)}`);

// EASTER EGG!
const program = input.split('\n')[0].split(',').map(Number);

const state = new ProgramState([...program]);
state.input.push(1);

runIntCode(state);

console.log(state.output.map((code) => String.fromCharCode(code)).join(''));
