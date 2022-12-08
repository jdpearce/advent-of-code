import * as fs from 'fs';
import * as path from 'path';
import { findSizeOfSmallestDirToDelete } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(
  `Size of smallest dir that will free up enough space = ${findSizeOfSmallestDirToDelete(input)}`
);
