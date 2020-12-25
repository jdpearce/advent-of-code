import * as fs from 'fs';
import * as path from 'path';
import { findLoopSize, transform } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const [card, door] = input
  .split('\n')
  .filter((x) => x)
  .map(Number);

const cardLoopsize = findLoopSize(card, 7);
const doorLoopsize = findLoopSize(door, 7);

console.log(`The encryption key is ${transform(card, doorLoopsize)}`);
