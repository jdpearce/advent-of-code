import * as fs from 'fs';
import * as path from 'path';
import { findShortestCostPath } from '../part-1/lib';
import { parseIntoBigGrid } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const grid = parseIntoBigGrid(input);
const cost = findShortestCostPath(grid);

console.log(`Shortest cost path is ${cost}`);
