import * as fs from 'fs';
import * as path from 'path';
import { numberOfArrangements } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const numbers = input
  .split('\n')
  .filter((x) => x)
  .map(Number);

console.log(`Number of arrangements is ${numberOfArrangements(numbers)}`);

console.log('...and via tribonacci:');
console.log(`Number of arrangements is ${numberOfArrangements(numbers)}`);
