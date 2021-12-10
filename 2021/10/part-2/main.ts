import * as fs from 'fs';
import * as path from 'path';
import { getFileCompletionMiddleScore } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Middle score is ${getFileCompletionMiddleScore(input)}`);
