import * as fs from 'fs';
import * as path from 'path';
import { countValidPassports, getPassports } from '../part-1/lib';
import { isPassportValid } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const passports = input.split('\n');

const valid = getPassports(passports).filter((p) => isPassportValid(p));

// Haha...silly RegEx. Why do you cause so much pain?
// for(const v of valid) {
//   console.log(v.byr, v.iyr, v.eyr, v.hgt, v.hcl, v.ecl, v.pid, v.cid);
// }

console.log(`Number of valid passports is ${countValidPassports(passports, isPassportValid)}`);
