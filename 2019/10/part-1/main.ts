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

console.log(
  `The best asteroid for the base is at ${JSON.stringify(
    best.location
  )} and it can see ${Object.keys(best.angles).length} asteroids.`
);
