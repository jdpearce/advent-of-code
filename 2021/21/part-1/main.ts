import * as fs from 'fs';
import * as path from 'path';
import { playGame } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const result = playGame([8, 6]);

console.log(`Losing player score * number of die throws is ${result[0] * result[1]}`);
