import * as fs from 'fs';
import * as path from 'path';
import { findShortestCostPath, parseIntoGrid } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const grid = parseIntoGrid(input);
const cost = findShortestCostPath(grid);

console.log(`Shortest cost path is ${cost}`);
