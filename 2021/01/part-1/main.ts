import * as fs from 'fs';
import * as path from 'path';
import { countIncreases } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const nums = input.split('\n').map(Number);

console.log(`Number of increases is ${countIncreases(nums)}`);
