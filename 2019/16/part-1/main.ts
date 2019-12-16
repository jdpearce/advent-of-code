import * as fs from 'fs';
import * as path from 'path';
import { calculateFFTPhase } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const transmission = input
  .split('\n')[0]
  .split('')
  .map(Number);

const output = calculateFFTPhase(transmission, 100)
  .slice(0, 8)
  .join('');
console.log(`First eight digits in the final output list are ${output}`);
