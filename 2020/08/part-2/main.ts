import * as fs from 'fs';
import * as path from 'path';
import { findTerminatingChange } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Accumulator is ${findTerminatingChange(input)} on termination.`);
