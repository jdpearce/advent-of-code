import * as fs from 'fs';
import * as path from 'path';
import { countLitPixels, enhance, parseGridAndAlgorithm } from '../part-1/lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

let [grid, algo] = parseGridAndAlgorithm(input);
for (let i = 0; i < 50; i++) {
  grid = enhance(grid, algo, i + 1);
}

console.log(`Number of lit pixels after 50 enhancements is ${countLitPixels(grid)}`);
