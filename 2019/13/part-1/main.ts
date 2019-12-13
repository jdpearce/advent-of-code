import * as fs from 'fs';
import * as path from 'path';
import { ProgramState, runUntilOutputOrHalt } from '../../09/part-1/lib';
import { Tile } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const program = input
  .split('\n')[0]
  .split(',')
  .map(Number);

const screenState: { [pos: string]: Tile[] } = {};

const state = new ProgramState(program);
do {
  runUntilOutputOrHalt(state);
  runUntilOutputOrHalt(state);
  runUntilOutputOrHalt(state);
  const [x, y, tile] = state.output;

  const pos = `${x}|${y}`;

  if (!screenState[pos]) {
    screenState[pos] = [];
  }

  screenState[pos].push(tile);

  state.output = [];
} while (state.hasNotHalted);

const numBlocks: number = Object.keys(screenState).reduce((acc, curr) => {
  return screenState[curr][screenState[curr].length - 1] === Tile.Block
    ? (acc += 1)
    : acc;
}, 0);

console.log(`Number of block tiles on screen at exit = ${numBlocks}`);
