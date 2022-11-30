import * as fs from 'fs';
import * as path from 'path';
import { solve2 } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const p1 = {
  position: 8,
  score: 0,
  next: true,
};

const p2 = {
  position: 6,
  score: 0,
  next: false,
};

// console.log(`${getWins([p1, p2])}`);

solve2(input);
