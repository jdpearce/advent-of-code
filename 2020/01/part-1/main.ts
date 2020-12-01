import * as fs from 'fs';
import * as path from 'path';
import { findTwoNumbersSummingTo } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const report = input
  .split('\n')
  .filter((x) => x) // eliminate empty rows
  .map(Number);

const [a, b] = findTwoNumbersSummingTo(report, 2020);

console.log(`The two numbers are: ${a} and ${b}`);
console.log(`The product is ${a * b}`);
