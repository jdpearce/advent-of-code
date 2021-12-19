import * as fs from 'fs';
import * as path from 'path';
import { buildScannerWorld, parseInputToScanners } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const maps = parseInputToScanners(input);
const world = buildScannerWorld(maps);

console.log(`Number of beacons in the world is ${world.length}`);
