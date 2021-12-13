import * as fs from 'fs';
import * as path from 'path';
import { foldGrid, getPointsAndFolds } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const [points, folds] = getPointsAndFolds(input);
const folded = foldGrid(points, folds[0]);

console.log(`Dots visible after completing the first fold are ${folded.length}`);
