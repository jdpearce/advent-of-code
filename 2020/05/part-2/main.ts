import * as fs from 'fs';
import * as path from 'path';
import { getSeat, getSeatId } from '../part-1/lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const passes = input.split('\n').filter((x) => x); // eliminate empty rows

const seatMap = new Set();
passes.forEach((pass) => {
  const seat = getSeat(pass);
  seatMap.add(getSeatId(seat));
});

const possibles = [];
for (let row = 1; row < 127; row++) {
  for (let seat = 0; seat < 8; seat++) {
    const seatId = getSeatId({ row, seat });
    if (!seatMap.has(seatId)) {
      possibles.push(seatId);
    }
  }
}

// Look for the first discontinuity
for (let i = 1; i < possibles.length; i++) {
  if (possibles[i] === possibles[i - 1] + 1) {
    continue;
  }

  console.log(`Seat Id is ${possibles[i]}`);
  break;
}
