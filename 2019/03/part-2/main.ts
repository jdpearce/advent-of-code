import * as fs from 'fs';
import * as path from 'path';
import { calcShortestTimingDistance } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const paths = input.split('\n').filter(x => x); // eliminate empty rows

console.log(`Shortest timing distance: ${calcShortestTimingDistance(paths)}`);
