import * as fs from 'fs';
import * as path from 'path';
import { addSnailNumbers, magnitude } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

let sum = addSnailNumbers(input);

console.log(`Final magnitude of the homework sum is ${magnitude(sum)}`);
