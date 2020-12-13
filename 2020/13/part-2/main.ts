import * as fs from 'fs';
import * as path from 'path';
import { getIdsAndOffsets } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const idsAndOffsets = getIdsAndOffsets(input);

// cheaty wolfram alpha solution
let equations = [];
for (const key of Object.keys(idsAndOffsets)) {
  equations.push(`(t+${idsAndOffsets[key]})mod(${key})=0`);
}

console.log(`https://www.wolframalpha.com/input/?i=${encodeURIComponent(equations.join())}`);
