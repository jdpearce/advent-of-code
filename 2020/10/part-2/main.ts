import * as fs from 'fs';
import * as path from 'path';
import { numberOfArrangements, numberOfArrangements2, numberOfArrangements3 } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const numbers = input
  .split('\n')
  .filter((x) => x)
  .map(Number);

console.log('Via memoized recursion:');
console.log(`Number of arrangements is ${numberOfArrangements(numbers)}`);

console.log('\n...and via tribonacci:');
console.log(`Number of arrangements is ${numberOfArrangements2(numbers)}`);

console.log('\n...and via hash table method');
console.log(`Number of arrangements is ${numberOfArrangements3(numbers)}`);
