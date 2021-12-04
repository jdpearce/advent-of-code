import * as fs from 'fs';
import * as path from 'path';
import { createBingoBoards, findWinningBoard, scoreBoard } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const nums = input.split('\n')[0].split(',').map(Number);
const winner = findWinningBoard(nums, createBingoBoards(input));

console.log(`The winning score will be ${scoreBoard(winner)}`);
