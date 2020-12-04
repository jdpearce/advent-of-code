import * as fs from 'fs';
import * as path from 'path';
import { countValidPassports, isPassportValid } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const passports = input.split('\n');

console.log(`Number of valid passports is ${countValidPassports(passports, isPassportValid)}`);
