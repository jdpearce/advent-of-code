import * as fs from 'fs';
import * as path from 'path';
import { findFirstInvalidNumber } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`First invalid number is ${findFirstInvalidNumber(input, 25)}`);
