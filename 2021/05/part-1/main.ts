import * as fs from 'fs';
import * as path from 'path';
import { calculateMap, countDangerZones } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const map = calculateMap(input);

console.log(`Number of danger zones is ${countDangerZones(map)}`);
