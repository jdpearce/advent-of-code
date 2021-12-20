import * as fs from 'fs';
import * as path from 'path';
import { countLitPixels, enhance, parseGridAndAlgorithm } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const [grid, algo] = parseGridAndAlgorithm(input);

const grid1 = enhance(grid, algo, 1);
const grid2 = enhance(grid1, algo, 2);

console.log(`Number of lit pixels after 2 enhancements is ${countLitPixels(grid2)}`);
