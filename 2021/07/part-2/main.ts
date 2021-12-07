import * as fs from 'fs';
import * as path from 'path';
import { calculateBestUseOfFuel } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Best use of fuel is ${calculateBestUseOfFuel(input)}`);
