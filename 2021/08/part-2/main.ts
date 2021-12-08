import * as fs from 'fs';
import * as path from 'path';
import { calculateOutputSum } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Total output sum is ${calculateOutputSum(input)}.`);
