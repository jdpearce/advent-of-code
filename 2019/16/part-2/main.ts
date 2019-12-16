import * as fs from 'fs';
import * as path from 'path';
import { calculateMessage } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const transmission = input
  .split('\n')[0]
  .split('')
  .map(Number);

let start = Date.now();
console.log(`The final message is ${calculateMessage(transmission)}`);
console.log(`Time taken = ${Date.now() - start}ms`);
