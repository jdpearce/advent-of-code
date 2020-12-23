import * as fs from 'fs';
import * as path from 'path';
import { calculateWinningScore, parseGame } from '../part-1/lib';
import { playGame } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const game = parseGame(input);
const win = playGame(game);

console.log(win.p1, win.p2);

console.log(`Winning score is ${calculateWinningScore(win)}`);
