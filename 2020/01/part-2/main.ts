import * as fs from 'fs';
import * as path from 'path';
import { findThreeNumbersSummingTo } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const report = input
  .split('\n')
  .filter((x) => x) // eliminate empty rows
  .map(Number);

const [a, b, c] = findThreeNumbersSummingTo(report, 2020);

console.log(`The three numbers are: ${a} and ${b} and ${c}`);
console.log(`The product is ${a * b * c}`);
