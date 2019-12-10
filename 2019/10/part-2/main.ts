import * as fs from 'fs';
import * as path from 'path';
import { AsteroidField } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const asteroidMap = input
  .split('\n')
  .filter(x => !!x)
  .map(x => x.split(''));

const field = new AsteroidField(asteroidMap);
const best = field.getBestAsteroid();

const angles = Object.keys(best.angles)
  .map(Number)
  .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  .map(String);

const destroy = [];
while (Object.keys(best.angles).length > 0) {
  // one sweep of the laser
  for (let i = 0; i < angles.length; i++) {
    if (best.angles[angles[i]]) {
      destroy.push(best.angles[angles[i]].pop());
      if (best.angles[angles[i]].length === 0) {
        delete best.angles[angles[i]];
      }
    }
  }
}

const bet = destroy[199];

console.log(
  `The 200th asteroid destroyed is ${JSON.stringify(
    bet.location
  )} and x * 100 + y = ${bet.location.x * 100 + bet.location.y}.`
);
