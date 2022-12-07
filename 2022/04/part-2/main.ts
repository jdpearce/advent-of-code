import * as fs from 'fs';
import * as path from 'path';
import { countOverlappingPairs } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Number of overlapping pairs is ${countOverlappingPairs(input)}`);
