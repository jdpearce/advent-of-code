import * as fs from 'fs';
import * as path from 'path';
import { calculateNumberOnTurn } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const numbers = input.split(',').map(Number);

console.log(`The number on the 2020th turn is ${calculateNumberOnTurn(numbers, 2020)}`);
