import * as fs from 'fs';
import * as path from 'path';
import { createMap } from '../part-1/lib';
import { timeToFlood } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const program = input
  .split('\n')[0]
  .split(',')
  .map(Number);

const [shipMap, oxygen] = createMap(program);

console.log(`O2 flood fill takes ${timeToFlood(shipMap, oxygen)}`);
