import * as fs from 'fs';
import * as path from 'path';
import { runIntCode } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const program = input
  .split('\n')[0]
  .split(',')
  .map(Number);

runIntCode(program);
