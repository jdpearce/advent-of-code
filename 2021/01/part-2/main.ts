import * as fs from 'fs';
import * as path from 'path';
import { countSlidingWindowIncreases } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const nums = input.split('\n').map(Number);
const windowSize = 3;

console.log(
  `Number of sliding window increases is ${countSlidingWindowIncreases(nums, windowSize)}`
);
