import * as fs from 'fs';
import * as path from 'path';
import { calculateLifeSupportRating } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Final life support rating is ${calculateLifeSupportRating(input)}`);
