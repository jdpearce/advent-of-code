import * as fs from 'fs';
import * as path from 'path';
import { getSeat, getSeatId } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const passes = input.split('\n').filter((x) => x); // eliminate empty rows

let max = 0;
passes.forEach((pass) => {
  const seatId = getSeatId(getSeat(pass));
  if (seatId > max) {
    max = seatId;
  }
});

console.log(`Max seatId is ${max}`);
