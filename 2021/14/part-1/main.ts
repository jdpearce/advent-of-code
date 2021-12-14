import * as fs from 'fs';
import * as path from 'path';
import { findMinMaxElementCounts, getNextStep, getStarterAndRules } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const [starter, rules] = getStarterAndRules(input);
let next = starter;
for (let i = 0; i < 10; i++) {
  next = getNextStep(next, rules);
}

const [min, max] = findMinMaxElementCounts(next);

console.log(`Most common element count minus the least common is ${max - min}`);
