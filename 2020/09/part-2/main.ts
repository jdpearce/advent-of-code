import * as fs from 'fs';
import * as path from 'path';
import { findContiguousRange } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const numbers = input
  .split('\n')
  .filter((x) => x)
  .map(Number);

const range = findContiguousRange(numbers, 257342611);
range.sort((a, b) => a - b);
const weakness = range[0] + range[range.length - 1];

console.log(`contiguous range is ${range}, the weakness is ${weakness}`);
