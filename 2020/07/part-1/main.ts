import * as fs from 'fs';
import * as path from 'path';
import { getBagCount } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Possible bags is ${getBagCount(input, 'shiny gold')}`);
