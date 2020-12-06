import * as fs from 'fs';
import * as path from 'path';
import { sumOfCounts } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Sum of the counts is ${sumOfCounts(input)}`);
