import * as fs from 'fs';
import * as path from 'path';
import { getSumInvalidNumbers } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`The sum of the invalid numbers is ${getSumInvalidNumbers(input)}`);
