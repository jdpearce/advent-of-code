import * as fs from 'fs';
import * as path from 'path';
import { parseRules } from '../part-1/lib';
import { countInside } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const rules = parseRules(input);

console.log(`Shiny gold bags should contain ${countInside(rules, 'shiny gold') - 1} other bags`);
