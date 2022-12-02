import * as fs from 'fs';
import * as path from 'path';
import { getCalorieCounts, sortDescending } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const totals = getCalorieCounts(input);
const largest = totals.sort(sortDescending)[0];

console.log(`The largest amount of calories carried is ${largest}`);
