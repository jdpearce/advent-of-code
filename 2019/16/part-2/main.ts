import * as fs from 'fs';
import * as path from 'path';
import { calculateMessage } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const transmission = input
  .split('\n')[0]
  .split('')
  .map(Number);

console.log(`The final message is ${calculateMessage(transmission)}`);
