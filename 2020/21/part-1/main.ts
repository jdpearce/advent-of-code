import * as fs from 'fs';
import * as path from 'path';
import { countSafeAppearances, parseFoodList } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const foods = parseFoodList(input);
const appearances = countSafeAppearances(foods);

console.log(`Number of times safe ingredients appear is ${appearances}`);
