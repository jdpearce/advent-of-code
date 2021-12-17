import * as fs from 'fs';
import * as path from 'path';
import { findBestTrajectoryHighpoint } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Best trajectory highpoint is ${findBestTrajectoryHighpoint(input)}`);
