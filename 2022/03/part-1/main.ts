import * as fs from 'fs';
import * as path from 'path';
import { calculateDuplicatePrioritySum } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const sum = calculateDuplicatePrioritySum(input);

console.log(`The sum of the priorities of duplicated item types is ${sum}`);
