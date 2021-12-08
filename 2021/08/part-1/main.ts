import * as fs from 'fs';
import * as path from 'path';
import { countNumberOfDigits } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Digits 1, 4, 7, 8 appear ${countNumberOfDigits(input)} times.`);
