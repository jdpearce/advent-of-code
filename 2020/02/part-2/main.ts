import * as fs from 'fs';
import * as path from 'path';
import { hasValidPassword } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const report = input.split('\n').filter((x) => x); // eliminate empty rows

const validPasswords = report.reduce((prev, curr) => {
  if (hasValidPassword(curr)) {
    prev++;
  }
  return prev;
}, 0);

console.log(`The number of valid passwords is: ${validPasswords}`);
