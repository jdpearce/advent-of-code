import * as fs from 'fs';
import * as path from 'path';
import { countDangerZones } from '../part-1/lib';
import { calculateMapWithDiagonals } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const map = calculateMapWithDiagonals(input);

console.log(`Number of danger zones is ${countDangerZones(map)}`);
