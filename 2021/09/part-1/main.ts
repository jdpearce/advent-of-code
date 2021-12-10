import * as fs from 'fs';
import * as path from 'path';
import { calculateRiskLevelSum } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Risk level sum is ${calculateRiskLevelSum(input)}`);
