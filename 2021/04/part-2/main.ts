import * as fs from 'fs';
import * as path from 'path';
import { createBingoBoards, scoreBoard } from '../part-1/lib';
import { findLosingBoard } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const nums = input.split('\n')[0].split(',').map(Number);
const loser = findLosingBoard(nums, createBingoBoards(input));

console.log(`The losing score will be ${scoreBoard(loser)}`);
