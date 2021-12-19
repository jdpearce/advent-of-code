import * as fs from 'fs';
import * as path from 'path';
import { buildScannerWorld, parseInputToScanners } from '../part-1/lib';
import { findLargestManhattanDistance } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const maps = parseInputToScanners(input);
const [scanners, world] = buildScannerWorld(maps);

console.log(
  `Largest manhattan distance between scanners is ${findLargestManhattanDistance(scanners)}`
);
