import * as fs from 'fs';
import * as path from 'path';
import { parseInstructions, startTheReactor } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const parsed = parseInstructions(input);
const result = startTheReactor(parsed);

console.log(`Number of active cubes in the small region is ${result}`);
