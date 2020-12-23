import * as fs from 'fs';
import * as path from 'path';
import { parseInput, playGame } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const game = parseInput(input, 1e6);
const [a, b] = playGame(game, 1e7);
console.log(`Number is ${a * b}`);
