import * as fs from 'fs';
import * as path from 'path';
import { runCode } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Accumulator is ${runCode(input).accumulator} before it loops.`);
