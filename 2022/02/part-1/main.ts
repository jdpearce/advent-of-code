import * as fs from 'fs';
import * as path from 'path';
import { calculateFinalScore } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const finalScore = calculateFinalScore(input);

console.log(`Final score would be ${finalScore}`);
