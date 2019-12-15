import * as fs from 'fs';
import * as path from 'path';
import { createMap, MapPoint } from './lib';
import { Screen } from './screen';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const program = input
  .split('\n')[0]
  .split(',')
  .map(Number);

const [shipMap, oxygen] = createMap(program);
const screen = new Screen(shipMap);
screen.outputScreen();

let current: MapPoint = oxygen;
let steps = 0;
while (current.parent !== undefined) {
  current = current.parent;
  steps++;
}

console.log(`Minimum steps from origin to the oxygen system is ${steps - 1}`);
