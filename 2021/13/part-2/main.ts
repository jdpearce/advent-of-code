import * as fs from 'fs';
import * as path from 'path';
import { foldGrid, getPointsAndFolds, prettyPrintPoints } from '../part-1/lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const [points, folds] = getPointsAndFolds(input);

let folded = [...points];
for (const fold of folds) {
  folded = foldGrid(folded, fold);
}

console.log(prettyPrintPoints(folded));
