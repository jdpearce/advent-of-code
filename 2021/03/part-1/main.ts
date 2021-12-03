import * as fs from 'fs';
import * as path from 'path';
import { calculatePowerConsumption } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Final power consumption is ${calculatePowerConsumption(input)}`);
