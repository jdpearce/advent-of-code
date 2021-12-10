import * as fs from 'fs';
import * as path from 'path';
import { getFileSyntaxScore } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Syntax score for input file is ${getFileSyntaxScore(input)}`);
