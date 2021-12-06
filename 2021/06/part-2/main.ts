import * as fs from 'fs';
import * as path from 'path';
import { calculateNumberOfFish, calculateState } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const fish = calculateState(input, 256);

console.log(`Number of lantern fish after 256 days is ${calculateNumberOfFish(fish)}`);
