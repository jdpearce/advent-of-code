import * as fs from 'fs';
import * as path from 'path';
import { getDepartureTimeAndId } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const result = getDepartureTimeAndId(input);

console.log(result);

console.log(`The departure time x bus id is ${result.time * result.id}`);
