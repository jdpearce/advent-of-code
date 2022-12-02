import * as fs from 'fs';
import * as path from 'path';
import { getCalorieCounts, sortDescending } from '../part-1/lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const totals = getCalorieCounts(input).sort(sortDescending);

console.log(
  `The sum of the top 3 amount of calories carried is ${totals[0] + totals[1] + totals[2]}`
);
