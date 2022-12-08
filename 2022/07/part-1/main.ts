import * as fs from 'fs';
import * as path from 'path';
import { sumDirsWithSizeAtMost } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(
  `sum of the total sizes of those directories at most 100000 = ${sumDirsWithSizeAtMost(
    input,
    100000
  )}`
);
