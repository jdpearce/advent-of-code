import * as fs from 'fs';
import * as path from 'path';
import { countTrajectoryTrees } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const treemap = input.split('\n').filter((x) => x); // eliminate empty rows

let multiplied = 1;
[
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
].forEach((vector) => {
  multiplied *= countTrajectoryTrees(treemap, vector);
});

console.log(`Number of trees multiplied is ${multiplied}`);
