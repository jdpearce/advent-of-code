import * as fs from 'fs';
import * as path from 'path';
import { getOffsets, getStartTime } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const offsets = getOffsets(input);

// cheaty wolfram alpha solution
let equations = [];
for (const key of Object.keys(offsets)) {
  equations.push(`(t+${offsets[key]})mod(${key})=0`);
}

console.log(`https://www.wolframalpha.com/input/?i=${encodeURIComponent(equations.join())}`);

// t = 1044388633269293 n + 305068317272992

// CRT sieving solution
// https://en.wikipedia.org/wiki/Chinese_remainder_theorem#Search_by_sieving
console.log(`\nThe solution using the CRT sieving method is: ${getStartTime(input)}`);
