import * as fs from 'fs';
import * as path from 'path';
import { countTrajectoryTrees } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const treemap = input.split('\n').filter((x) => x); // eliminate empty rows

console.log(`Number of trees is ${countTrajectoryTrees(treemap, [3, 1])}`);
