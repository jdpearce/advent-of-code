import * as fs from 'fs';
import * as path from 'path';
import { countFlips } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const flips = countFlips(input);

const counts = [...flips.values()];

const odd = counts.filter((x) => x.count % 2 === 1).length;

console.log(`The number of tiles left black should be ${odd}`);
