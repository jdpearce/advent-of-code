import * as fs from 'fs';
import * as path from 'path';
import { countOrbits, populateOrbits } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const orbits = input.split('\n').filter(x => x);

console.log(
  `The total number of orbits is ${countOrbits(populateOrbits(orbits))}`
);
