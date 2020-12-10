import * as fs from 'fs';
import * as path from 'path';
import { calculateDistribution } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const numbers = input
  .split('\n')
  .filter((x) => x)
  .map(Number);

const diffs = calculateDistribution(numbers);

console.log(`Joltage differences multiplied are ${diffs[1] * diffs[3]}`);
