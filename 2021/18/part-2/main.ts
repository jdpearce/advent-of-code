import * as fs from 'fs';
import * as path from 'path';
import { getLargestMagnitudeSum } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Largest magnitude sum is ${getLargestMagnitudeSum(input)}`);
