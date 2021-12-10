import * as fs from 'fs';
import * as path from 'path';
import { findLargestBasinsProduct } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Largest basins product is ${findLargestBasinsProduct(input)}`);
