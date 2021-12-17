import * as fs from 'fs';
import * as path from 'path';
import { findWorkingTrajectories } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Number of working trajectories is ${findWorkingTrajectories(input).length}`);
