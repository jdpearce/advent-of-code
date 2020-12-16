import * as fs from 'fs';
import * as path from 'path';
import { getSeparateBits } from '../part-1/lib';
import { identifyFields } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const bits = getSeparateBits(input);
const fields = identifyFields(input);

const depFields = [...fields.keys()].filter((x) => x.startsWith('departure'));

let multiple = 1;
for (const field of depFields) {
  multiple *= bits.mine[fields.get(field)];
}

console.log(`The result is ${multiple}`);
