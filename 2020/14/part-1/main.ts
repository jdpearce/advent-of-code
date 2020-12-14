import * as fs from 'fs';
import * as path from 'path';
import { runProgram, sumValues } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const output = runProgram(input);
console.log(`Sum of memory values after running is ${sumValues(output)}`);
