import * as fs from 'fs';
import * as path from 'path';
import { getStarterAndRules } from '../part-1/lib';
import { findMinMaxElementCounts, getInitialLetterCounts, getNextStep, getPairCounts } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const [starter, rules] = getStarterAndRules(input);

const pairCounts = getPairCounts(starter, rules);

let letterCounts = getInitialLetterCounts(starter);
let next = pairCounts;
for (let i = 0; i < 40; i++) {
  [letterCounts, next] = getNextStep(letterCounts, next, rules);
}

const [min, max] = findMinMaxElementCounts(letterCounts);

console.log(`Most common element count minus the least common after 40 iterations is ${max - min}`);
