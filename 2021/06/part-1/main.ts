import * as fs from 'fs';
import * as path from 'path';
import { calculateState } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const fish = calculateState(input, 80);

console.log(`Number of lantern fish after 80 days is ${fish.length}`);
