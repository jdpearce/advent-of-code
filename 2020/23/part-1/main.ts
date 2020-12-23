import * as fs from 'fs';
import * as path from 'path';
import { parseInput, playGame } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const game = parseInput(input);
console.log(playGame(game, 100));
