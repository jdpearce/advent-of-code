import * as fs from 'fs';
import * as path from 'path';
import { calculateNumberOnTurn } from '../part-1/lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const numbers = input.split(',').map(Number);

console.log(`The number on the 30000000th turn is ${calculateNumberOnTurn(numbers, 30000000)}`);
