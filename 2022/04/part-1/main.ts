import * as fs from 'fs';
import * as path from 'path';
import { countContainedPairs } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Number of contained pairs is ${countContainedPairs(input)}`);
